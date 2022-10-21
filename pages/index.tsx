import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { ITweet } from "../typings";
import { fetchTweet } from "../utils/fetchTweet";

interface Props {
  tweets: ITweet[];
}
const Home = ({ tweets }: any) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="body lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter Clone</title>
      </Head>
      <Toaster />
      <main className="main relative h-screen grid grid-cols-9">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Feed tweets={tweets} setShowSidebar={setShowSidebar} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweet();
  return {
    props: {
      tweets,
    },
  };
};
