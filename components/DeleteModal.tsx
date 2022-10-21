import { deleteDoc, doc } from "firebase/firestore";
import { MouseEventHandler } from "react";
import { db } from "../firebase";
import { ITweet } from "../typings";
import { fetchTweet } from "../utils/fetchTweet";

interface Props {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTweets: React.Dispatch<React.SetStateAction<ITweet[]>>;
  tweet: ITweet;
}

function DeleteModal({ setDeleteModal, setTweets, tweet }: Props) {
  const deleteTweet = async (e: any) => {
    e.preventDefault();
    await deleteDoc(doc(db, "tweet", tweet.id));
    const tweets = await fetchTweet();
    setTweets(tweets);
  };
  return (
    <div className="delete-modal">
      <div className="relative p-4 w-full max-w-md h-auto md:h-auto ">
        <div className="relative bg-white rounded-2xl shadow ">
          <div className="flex flex-col space-y-3 p-6 text-center">
            <h3 className="text-2xl text-start font-bold text-black">
              Delete Tweet?
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              This can’t be undone and it will be removed from your profile, the
              timeline of any accounts that follow you, and from Twitter search
              results.
            </p>
            <button
              onClick={deleteTweet}
              type="button"
              className="delete-button"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setDeleteModal(false);
              }}
              type="button"
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
