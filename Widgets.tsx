import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";
function Widgets() {
  return (
    <div className="px-2 mt-2 col-span-2 hidden lg:block">
      <div className="search-input-div">
        <MagnifyingGlassIcon className="h-5 w-5  " />
        <input
          type="text"
          placeholder="Search Twitter"
          className="search-input group"
        />
      </div>
      <div className="h-screen">
        <TwitterTimelineEmbed
          autoHeight
          noHeader
          noScrollbar
          sourceType="profile"
          screenName="jack"
        />
      </div>
    </div>
  );
}

export default Widgets;
