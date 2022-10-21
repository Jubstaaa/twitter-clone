export type TweetBody = {
  text: string;
  username: string;
  profileImg: string;
  image?: string;
  email:string;
  date:string;
  like:[];
  comments:[];
};

export interface ITweet extends TweetBody {
  id: string;
}

export type IComment = {
  text: string;
  username: string;
  profileImg: string;
  id:string;
  email:string;
  date:string;
};

export type ILike={
  email:string
}
