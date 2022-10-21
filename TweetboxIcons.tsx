import {
  CalendarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  GifIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
function TweetboxIcons({ photoClick }: { photoClick: () => any }) {
  return (
    <div className="flex text-twitter ">
      <div className="tweetbox-icon-div">
        <PhotoIcon onClick={photoClick} className="tweetbox-icon" />
      </div>
      <div className="tweetbox-icon-div">
        <GifIcon className="tweetbox-icon" />
      </div>
      <div className="tweetbox-icon-div">
        <ListBulletIcon className="tweetbox-icon" />
      </div>
      <div className="tweetbox-icon-div">
        <FaceSmileIcon className="tweetbox-icon" />
      </div>
      <div className="tweetbox-icon-div">
        <CalendarIcon className="tweetbox-icon" />
      </div>
      <div className="tweetbox-icon-div">
        <MapPinIcon className="tweetbox-icon" />
      </div>
    </div>
  );
}

export default TweetboxIcons;
