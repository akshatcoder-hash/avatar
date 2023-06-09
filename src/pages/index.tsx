import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Avatar</title>
        <meta name="description" content="KYC Verification System on Solana." />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
