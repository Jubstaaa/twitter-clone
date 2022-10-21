import Image from "next/image";
import TimeAgo from "react-timeago";
import { IComment } from "../typings";
import { slugify } from "./functions";
interface Props {
  comment: IComment;
}
function Comment({ comment }: Props) {
  return (
    <div className="relative flex space-x-2" id="comment">
      <hr className="absolute left-5 -top-7 h-8 border-x border-gray-500/30 " />
      <div className="mt-2 h-7 w-7 relative ">
        <Image
          className="rounded-full object-cover"
          objectFit="cover"
          src={comment.profileImg}
          layout="fill"
          alt=""
        />
      </div>
      <div className="f">
        <div className="flex items-center space-x-1">
          <p className=" font-bold">{comment.username}</p>
          <p className="hidden text-sm text-gray-500 lg:inline">
            @{slugify(comment.username)}
          </p>
          <span>·</span>
          <TimeAgo className="text-sm text-gray-500" date={comment.date} />
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}

export default Comment;
