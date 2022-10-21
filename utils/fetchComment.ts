import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
export const fetchComment = async (id: any) => {
  const commentsData = await getDoc(doc(db, "tweet", id));
  const comments = commentsData.data();
  if(comments){
    const comment = comments.comments;
  return comment;
  }
  
};
