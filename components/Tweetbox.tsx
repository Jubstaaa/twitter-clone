import Image from "next/image";
import React, { useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { ITweet } from "../typings";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import { fetchTweet } from "../utils/fetchTweet";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import TweetboxIcons from "./TweetboxIcons";

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<ITweet[]>>;
}

function Tweetbox({ setTweets }: Props) {
  const inputFile = useRef<any>(null);
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [tweeting, setTweeting] = useState({
    percent: 0,
    color: "bg-twitterBold",
  });
  const { data: session } = useSession();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTweet();
    setInput("");
    setImage("");
  };
  const photoClick = () => {
    if (!session) {
      toast.error("You have to login first");
    } else {
      inputFile?.current?.click();
    }
  };
  const addTweet = async () => {
    setTweeting({ percent: 40, color: "bg-twitterBold" });
    try {
      await addDoc(collection(db, "tweet"), {
        username: session?.user?.name,
        profileImg: session?.user?.image || "/img/pp.png",
        text: input,
        date: new Date().toString(),
        image: image,
        like: [],
        comments: [],
        email: session?.user?.email,
      });
      setTweeting({ percent: 100, color: "bg-twitterBold" });
    } catch (e: any) {
      setTweeting({ percent: 100, color: "bg-red-500" });
      setTimeout(() => {
        setTweeting({ percent: 0, color: "bg-red-500" });
      }, 1000);
      toast.error(e);
    }
    setTimeout(() => {
      setTweeting({ percent: 0, color: "bg-twitterBold" });
    }, 1000);
    const newTweets = await fetchTweet();
    setTweets(newTweets);
  };

  const addImage = (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    } else if (!file.type.includes("image")) {
      return toast.error("Unsupported file type");
    } else {
      const storageRef = ref(
        storage,
        `gs://twitter-clone-d11ce.appspot.com/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {},
        (error: any) => {
          toast.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              setImage(downloadURL);
            }
          );
        }
      );
    }
  };

  return (
    <div className="relative flex space-x-2 p-2 md:p-5">
      <div className="inset-0 absolute w-full bg-transparent rounded-full h-1 mt-1">
        <div
          className={`${tweeting.color} h-1 rounded-full `}
          style={{ width: tweeting.percent + "%" }}
        ></div>
      </div>
      <div className="relative h-12 w-12 md:h-14 md:w-14 mt-4 ">
        <Image
          className="rounded-full object-cover "
          src={session?.user?.image || "/img/pp.png"}
          alt=""
          layout="fill"
        />
      </div>
      <div className="flex flex-1 items-center  pl-2">
        <div className="flex flex-1 flex-col">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            type="text"
            placeholder="What's Happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl placeholder:text-gray-500"
          />
          <div className="flex items-center justify-between">
            <TweetboxIcons photoClick={photoClick} />
            <div
              onMouseEnter={() => {
                !session && toast.error("You have to login first");
              }}
            >
              <button
                type="submit"
                disabled={!input || !session}
                onClick={handleClick}
                className="tweet-button px-5 py-2"
              >
                Tweet
              </button>
            </div>
            <input
              className="hidden w-0 h-0 absolute"
              type="file"
              ref={inputFile}
              onChangeCapture={addImage}
            />
          </div>

          {image && (
            <div className="relative h-40 w-full rounded-xl shadow-sm self-center mt-2  ">
              <Image
                className="object-contain h-full "
                src={image}
                alt=""
                layout="fill"
                objectFit="contain"
              />
              <div
                onClick={() => {
                  setImage("");
                }}
                className="flex items-center justify-center absolute inset-0 cursor-pointer m-1 h-6 w-6 rounded-full bg-gray-600 hover:bg-gray-600/90"
              >
                <XMarkIcon className="text-white h-5 w-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tweetbox;
