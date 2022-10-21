import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { fetchTweet } from "../utils/fetchTweet";
import { db } from "../firebase";
import { IComment, ITweet } from "../typings";
import toast from "react-hot-toast";
import { fetchComment } from "../utils/fetchComment";

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<ITweet[]>>;
  tweet: ITweet;
  setCommentBoxVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}
function Commentbox({
  setTweets,
  tweet,
  setCommentBoxVisible,
  setComments,
}: Props) {
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();
  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tweets = await fetchTweet();
    setTweets(tweets);
    if (tweets.find((item: ITweet) => item.id == tweet.id)) {
      try {
        await updateDoc(doc(db, "tweet", tweet.id), {
          comments: arrayUnion({
            username: session?.user?.name,
            profileImg: session?.user?.image || "/img/pp.png",
            text: input,
            date: new Date().toString(),
            id: (Math.random() + 1).toString(36).substring(2),
            email: session?.user?.email,
          }),
        });
      } catch (e: any) {
        toast.error(e);
      }
      setInput("");
      setCommentBoxVisible(false);
      const newComments = await fetchComment(tweet.id);
      setComments(newComments);
    } else {
      toast.error("The tweet was deleted");
    }
  };
  return (
    <form onSubmit={addComment} className="mt-3 flex space-x-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
        type="text"
        placeholder="Tweet your reply"
      />

      <button
        disabled={!input}
        type="submit"
        className="bg-twitter px-3 py-2 font-bold text-white rounded-full disabled:opacity-40 hover:bg-twitterBold "
      >
        Reply
      </button>
    </form>
  );
}

export default Commentbox;
