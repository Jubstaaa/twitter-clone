import React, { useEffect, useState } from "react";
import { ITweet, ILike, IComment } from "../typings";
import TimeAgo from "react-timeago";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { slugify } from "./functions";
import { fetchComment } from "../utils/fetchComment";
import { fetchLike } from "../utils/fetchLike";

import Comment from "./Comment";
import DeleteModal from "./DeleteModal";
import Commentbox from "./Commentbox";
import TweetIcons from "./TweetIcons";
import TweetImage from "./TweetImage";
import Image from "next/image";

interface Props {
  tweet: ITweet;
  setTweets: React.Dispatch<React.SetStateAction<ITweet[]>>;
}

function Tweet({ tweet, setTweets }: Props) {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [likes, setLikes] = useState<ILike[]>(tweet.like);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchComments = async () => {
      const newComments = await fetchComment(tweet.id);
      setComments(newComments);
    };
    fetchComments();
  }, [tweet.comments]);

  useEffect(() => {
    const fetchLikes = async () => {
      const newLikes = await fetchLike(tweet.id);
      setLikes(newLikes);
    };
    fetchLikes();
  }, [tweet.like]);

  useEffect(() => {
    if (likes.findIndex((e) => e.email === session?.user?.email) != -1) {
      setLike(true);
    }
  }, [likes]);

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3 ">
        <div className="relative h-14 w-14 ">
          <Image
            className="rounded-full object-cover"
            objectFit="cover"
            src={tweet.profileImg}
            alt=""
            width="90%"
            height="90%"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-1">
              <p className="font-bold">{tweet.username}</p>
              <p className="hidden text-sm text-gray-500 sm:inline">
                @{slugify(tweet.username)}
              </p>
              <span>·</span>
              <TimeAgo className="text-sm text-gray-500" date={tweet.date} />
            </div>
            {session?.user?.email == tweet.email && (
              <>
                <TrashIcon
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                  className="h-6 w-6 text-red-600 cursor-pointer"
                />
                {deleteModal && (
                  <DeleteModal
                    setDeleteModal={setDeleteModal}
                    setTweets={setTweets}
                    tweet={tweet}
                  />
                )}
              </>
            )}
          </div>
          <p>{tweet.text}</p>
          {tweet.image && <TweetImage image={tweet?.image} />}
        </div>
      </div>
      <TweetIcons
        setCommentBoxVisible={setCommentBoxVisible}
        commentBoxVisible={commentBoxVisible}
        comments={comments}
        likes={likes}
        like={like}
        setLike={setLike}
        setTweets={setTweets}
        tweet={tweet}
        setLikes={setLikes}
      />
      {commentBoxVisible && (
        <Commentbox
          setTweets={setTweets}
          tweet={tweet}
          setCommentBoxVisible={setCommentBoxVisible}
          setComments={setComments}
        />
      )}

      {comments.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 ">
          {comments
            .slice(0)
            .reverse()
            .map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
