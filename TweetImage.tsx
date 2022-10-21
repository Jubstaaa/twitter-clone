import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
interface Props {
  image: string;
}
function TweetImage({ image }: Props) {
  const [lightbox, setLightbox] = useState<boolean>(false);

  return (
    <div className="relative  w-full h-60 cursor-pointer">
      <Image
        onClick={() => setLightbox(true)}
        src={image}
        alt=""
        className=" mb-1 rounded-lg object-cover shadow-sm "
        layout="fill"
        objectFit="cover"
      />

      <Lightbox
        open={lightbox}
        close={() => setLightbox(false)}
        slides={[{ src: image }]}
      />
    </div>
  );
}

export default TweetImage;
