import { TweetAPI, TweetParsed, TweetUser } from "../addl";

/*
 * Code modified from Lee Robinson's tweet embed video tutorial.
 */

export const getSingleTweet = async (id: string | number) => {
  const queryParams = new URLSearchParams({
    id: id.toString(),
    expansions:
      "author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id",
    "tweet.fields":
      "attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text",
    "user.fields": "id,name,profile_image_url,protected,url,username,verified",
    "media.fields":
      "duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics",
  });

  const response = await fetch(
    `https://api.twitter.com/2/tweets?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_BEARER}`,
      },
    }
  );

  const tweet: TweetAPI = await response.json();

  const getAuthorInfo: (autor_id: string) => TweetUser = (
    author_id: string
  ) => {
    const author = tweet.includes.users.find((user) => user.id === author_id);
    if (!author) {
      return {
        id: "",
        name: "",
        username: "",
        profile_image_url: "",
        protected: false,
        verified: false,
        url: "",
      };
    }

    return author;
  };

  const getReferencedTweets = (mainTweet: TweetAPI) => {
    return (
      mainTweet?.referenced_tweets?.map((referencedTweet) => {
        const fullReferencedTweet = tweet.includes.tweets?.find(
          (tweet) => tweet.id === referencedTweet.id
        );

        if (!fullReferencedTweet) {
          return;
        }

        const tweetRefParsed: TweetParsed = parseTweet(fullReferencedTweet);
        if (tweet.type) tweetRefParsed.type = tweet.type;

        return tweetRefParsed;
      }) || []
    );
  };

  const getMedia = () => {
    const media = tweet.attachments?.media_keys?.map((key) =>
      tweet.includes.media?.find((media) => media.media_key === key)
    );

    return media || [];
  };

  const parseTweet = (tweet: TweetAPI): TweetParsed => {
    const parsedTweet: TweetParsed = {
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      public_metrics: tweet.public_metrics,
      author: getAuthorInfo(tweet.author_id),
    };

    if (tweet.in_reply_to_user_id) {
      parsedTweet.in_reply_to_user_id = tweet.in_reply_to_user_id;
    }

    if (tweet.referenced_tweets) {
      parsedTweet.referenced_tweets = getReferencedTweets(tweet);
    }

    if (tweet.attachments?.media_keys) {
      parsedTweet.media = getMedia();
    }

    return parsedTweet;
  };

  const returnObject: TweetParsed = parseTweet(tweet);

  return returnObject;
};
