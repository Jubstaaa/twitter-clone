import { Bars3Icon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Errorpage() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Page not found / Twitter Clone</title>
      </Head>
      <main className="relative h-screen grid grid-cols-9">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <div className="col-span-9 max-h-screen overflow-scroll sm:col-span-8 md:col-span-7 lg:col-span-7">
          <div className="flex items-center justify-start space-x-2 sm:hidden ">
            <Bars3Icon
              onClick={() => {
                setShowSidebar(true);
              }}
              className="p-1 pb-0 h-12 w-12 sm:hidden"
            />
            <h1 className=" text-xl font-bold">Not found</h1>
          </div>
          <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="flex flex-col items-center justify-start h-full w-full p-20 text-center text-gray-500 space-y-6">
              <p>
                Hmm...this page doesn’t exist. Try searching for something else.
              </p>
              <Link href={"/"}>
                <a type="submit" className="tweet-button w-32 px-5 py-2 ">
                  Homepage
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Errorpage;
