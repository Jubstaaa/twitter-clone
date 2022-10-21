import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
export const fetchLike = async (id: any) => {
  const likeData = await getDoc(doc(db, "tweet", id));
  const like = likeData.data();
  if(like){
    const likes = like.like;
    return likes;
  }
  
};
