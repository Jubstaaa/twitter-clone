import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
export const fetchTweet = async () => {
  const tweets: any = [];
  const tweet = await getDocs(
    query(collection(db, "tweet"), orderBy("date", "desc"))
  );
  tweet.forEach((doc) => {
    tweets.push({ id: doc.id, ...doc.data() });
  });

  return tweets;
};
