import React, { MouseEventHandler, useState } from "react";
import SidebarRow from "./SidebarRow";
import {
  BellIcon,
  HashtagIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
  BookmarkIcon,
  XMarkIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
interface Props {
  showSidebar: boolean;
  setShowSidebar: (value: React.SetStateAction<boolean>) => void;
}
function Sidebar({ showSidebar, setShowSidebar }: Props) {
  const { data: session } = useSession();
  return (
    <div
      className={`${
        !showSidebar ? "-translate-x-44 " : ""
      }sidebar sm:translate-x-0`}
    >
      <div>
        <div className="m-3 h-10 w-10 relative">
          <Image src="/img/logo.png" alt="Twitter Logo" layout="fill" />
        </div>
        <SidebarRow Icon={HomeIcon} title="Home" />
        <SidebarRow Icon={HashtagIcon} title="Explore" />
        <SidebarRow Icon={BellIcon} title="Notifications" />
        <SidebarRow Icon={EnvelopeIcon} title="Messages" />
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarRow Icon={DocumentTextIcon} title="Lists" />
        <SidebarRow
          onClick={session ? signOut : signIn}
          Icon={UserIcon}
          title={session ? "Sign Out" : "Sign In"}
        />
        <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
        <button
          disabled={!session}
          className="tweet-button mt-2 py-3 hidden md:block px-10 lg:px-20"
        >
          Tweet
        </button>
      </div>
      <div className="flex items-start justify-start">
        <XMarkIcon
          onClick={() => {
            setShowSidebar(false);
          }}
          className="h-14 w-12 sm:hidden"
        />
      </div>
    </div>
  );
}

export default Sidebar;
