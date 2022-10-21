import {
  ChatBubbleOvalLeftIcon,
  ArrowsRightLeftIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as RedHeartIcon } from "@heroicons/react/24/solid";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { IComment, ILike, ITweet } from "../typings";
import { fetchLike } from "../utils/fetchLike";
import { fetchTweet } from "../utils/fetchTweet";
interface Props {
  setCommentBoxVisible: (value: React.SetStateAction<boolean>) => void;
  commentBoxVisible: boolean;
  comments: IComment[];
  likes: ILike[];
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  setTweets: React.Dispatch<React.SetStateAction<ITweet[]>>;
  tweet: ITweet;
  setLikes: React.Dispatch<React.SetStateAction<ILike[]>>;
}
function TweetIcons({
  setCommentBoxVisible,
  commentBoxVisible,
  comments,
  likes,
  like,
  setLike,
  setTweets,
  tweet,
  setLikes,
}: Props) {
  const { data: session } = useSession();
  const handleLike = async () => {
    setLike(!like);
    const tweets = await fetchTweet();
    setTweets(tweets);
    if (tweets.find((item: ITweet) => item.id == tweet.id)) {
      try {
        await updateDoc(
          doc(db, "tweet", tweet.id),
          !like
            ? {
                like: arrayUnion({
                  email: session?.user?.email,
                }),
              }
            : {
                like: arrayRemove({
                  email: session?.user?.email,
                }),
              }
        );
      } catch (e: any) {
        toast.error(e);
      }
      const newLikes = await fetchLike(tweet.id);
      setLikes(newLikes);
    } else {
      toast.error("The tweet was deleted");
    }
  };
  return (
    <div className="mt-2 flex justify-between items-center">
      <div
        onClick={() =>
          session
            ? setCommentBoxVisible(!commentBoxVisible)
            : toast.error("You have to login first")
        }
        className="tweet-icon-div group hover:bg-blue-400/40 "
      >
        <ChatBubbleOvalLeftIcon className="tweet-icon  group-hover:text-blue-400 " />
        {comments.length > 0 && (
          <p className="mx-2 group-hover:text-blue-400">{comments.length}</p>
        )}
      </div>

      <div className="tweet-icon-div group hover:bg-green-400/40 ">
        <ArrowsRightLeftIcon className="tweet-icon group-hover:text-green-400 " />
      </div>
      <div
        onClick={() => {
          session ? handleLike() : toast.error("You have to login first");
        }}
        className="tweet-icon-div group hover:bg-pink-400/50 "
      >
        {!like ? (
          <HeartIcon className="tweet-icon group-hover:text-pink-400 " />
        ) : (
          <RedHeartIcon className="tweet-icon text-red-600" />
        )}
        {likes.length > 0 && (
          <p className="mx-2 group-hover:text-red-600">{likes.length}</p>
        )}
      </div>
      <div className="tweet-icon-div group hover:bg-blue-400/40 ">
        <ArrowUpTrayIcon className="tweet-icon group-hover:text-blue-400 " />
      </div>
    </div>
  );
}

export default TweetIcons;
