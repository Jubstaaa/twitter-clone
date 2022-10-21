import React, { useState } from "react";
import { ArrowPathIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Tweetbox from "./Tweetbox";
import { ITweet } from "../typings";
import TweetComponent from "./Tweet";
import toast from "react-hot-toast";
import { fetchTweet } from "../utils/fetchTweet";
import { useEffect } from "react";
import { fetchComment } from "../utils/fetchComment";
import { fetchLike } from "../utils/fetchLike";
interface Props {
  tweets: ITweet[];
  setShowSidebar: (value: React.SetStateAction<boolean>) => void;
}

function Feed({ tweets: tweetsProp, setShowSidebar }: Props) {
  const [tweets, setTweets] = useState<ITweet[]>(tweetsProp);

  async function handleRefresh() {
    const loading = toast.loading("Fetching tweets...");
    const tweets = await fetchTweet();
    setTweets(tweets);
    toast.success("Everything up-to-date", {
      id: loading,
    });
  }

  return (
    <div className="col-span-9 border-x max-h-screen overflow-scroll sm:col-span-8 md:col-span-7 lg:col-span-5">
      <div className="flex items-center justify-between space-y-3 ">
        <div className="flex items-center justify-center space-x-2 ">
          <Bars3Icon
            onClick={() => {
              setShowSidebar(true);
            }}
            className="p-1 pb-0 h-12 w-12 sm:hidden"
          />
          <h1 className=" text-xl font-bold">Home</h1>
        </div>
        <ArrowPathIcon onClick={handleRefresh} className=" refresh-button" />

        <div className="flex cursor-pointer   p-2 rounded-full hover:bg-gray-200/80">
          <svg viewBox="0 0 24 24" aria-hidden="true" className=" h-6 w-6  ">
            <g>
              <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div>
        <Tweetbox setTweets={setTweets} />
      </div>

      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet.id} tweet={tweet} setTweets={setTweets} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
