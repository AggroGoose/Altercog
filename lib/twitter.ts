import {
  MultiTweetResponse,
  ParseElement,
  TweetAPI,
  TweetParsed,
  TweetUser,
} from "../addl";

/*
 * Code modified from Lee Robinson's tweet embed video tutorial.
 */

export const getSingleTweet = async (id: string | number) => {
  const queryParams = new URLSearchParams({
    ids: id.toString(),
    expansions:
      "author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id",
    "tweet.fields":
      "attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text",
    "user.fields": "id,name,profile_image_url,protected,url,username,verified",
    "media.fields":
      "duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics",
  });

  const token = process.env.TWITTER_API_BEARER;

  const response: void | MultiTweetResponse = await fetch(
    `https://api.twitter.com/2/tweets?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("ERROR WILL ROBINSON", error);
    });

  if (!response) return;

  const tweet: TweetAPI = { ...response.data[0], includes: response.includes };

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

export const TwitterFinder = (arr: Array<ParseElement>) => {
  const twitterArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name == "figure") {
      console.log("Figure found");
      if (!arr[i].children) {
        console.log("No children");
        continue;
      }
      const childArr = arr[i].children?.find(
        (child) => child.attributes.class == "twitter-tweet"
      );
      if (!childArr) continue;
      console.log("Twitter found");
      const tweetRef = childArr.children?.find((child) => child.name === "a");
      if (tweetRef?.attributes.href) {
        const tweetUrl = tweetRef.attributes.href;
        const tweetEnd = tweetUrl.split("/").pop();
        const tweetId = tweetEnd?.split("?").shift();
        if (tweetId && arr[i].id) {
          twitterArr.push({ id: arr[i].id, tweetId });
        }
      }
    }
  }
  return twitterArr;
};
