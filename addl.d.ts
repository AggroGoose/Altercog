export interface ParseElement {
  name: string;
  attributes: ElemAttribs;
  id?: string | number;
  content?: string;
  children?: ParseElement[];
  additional?: {
    tweet?: TweetParsed;
  };
}

export interface ElemAttribs {
  content?: string;
  children?: Object[];
  key?: string | number | undefined;
  id?: string;
  className?: string;
  class?: string;
  href?: string;
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
}

interface MenuProps {
  isMenuOpen?: boolean;
  setIsMenuOpen: Function;
  menuType: string;
  setMenuType: Function;
  resetMenu: () => void;
  infoBanner?: BannerProps;
}

export interface BannerProps {
  isOpen: boolean;
  type: string;
  message: string;
}

export interface Tweet {
  id: string;
  text: string;
  type?: string;
  created_at: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  in_reply_to_user_id?: string;
}

export interface TweetData extends Tweet {
  author_id: string;
  referenced_tweets?: {
    type: string;
    id: string;
  }[];
  attachments?: {
    media_keys: string[];
  };
}

export interface MultiTweetResponse {
  data: TweetData[];
  includes: {
    users: TweetUser[];
    tweets?: TweetAPI[];
    media?: TweetMedia[];
  };
}

export interface TweetAPI extends TweetData {
  includes: {
    users: TweetUser[];
    tweets?: TweetAPI[];
    media?: TweetMedia[];
  };
}

export interface TweetParsed extends Tweet {
  author: TweetUser;
  media?: (TweetMedia | undefined)[] | undefined;
  referenced_tweets?: (TweetParsed | undefined)[] | undefined;
}

export interface TweetUser {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  protected: boolean;
  verified: boolean;
  url: string;
}

export interface TweetMedia {
  media_key: string;
  type: string;
  url: string;
  preview_image_url?: string;
  width: number;
  height: number;
  duration_ms?: number;
  public_metrics?: {
    view_count: number;
  };
}
[];
