import Link from "next/link";
import { useState } from "react";
import { FC, useMemo } from "react";
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { IdentityButton, ButtonMode, GatewayProvider } from "@civic/solana-gateway-react";
import { Connection, clusterApiUrl } from '@solana/web3.js';
import styles from "./index.module.css";
import { PublicKey } from '@solana/web3.js';
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import  DigilockerLoginButton  from "components/DigilockerLoginButton";
 
export const HomeView: FC = ({}) => {
  const { publicKey } = useWallet();

  const onClick = () => {};
  const GATEKEEPER_NETWORK = new PublicKey('ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6');


  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => process.env.REACT_APP_RPC_ENDPOINT || clusterApiUrl(network), [network]);
  
  // TODO: Initiate IdentityButton
  const Content = () => {
    const wallet = useWallet()
    return <header className="App-header">
        {wallet.connected && <IdentityButton/>}
    </header>
}

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <DigilockerLoginButton />
    </div>
  );
};

const Gateway = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  return <GatewayProvider connection={connection} wallet={wallet} gatekeeperNetwork={new PublicKey(GATEKEEPER_NETWORK)}>
      <Content/>
  </GatewayProvider>
}
  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <span className="text-4xl">🦤</span>
            </button>
          </div>
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">Avatar</span>
          </div>
          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="hero min-h-16 py-4">
            <div className="text-center hero-content">
              <div className="max-w-lg">
                <h1 className="mb-5 text-5xl font-bold">
                  Avatar
                </h1>
                <p className="mb-5">
                  On Chain KYC Verification System.
                </p>
                <p className="mb-5">
                  Connect your wallet to get started.
                </p>
                <p>
                  {publicKey ? <>Your address: {publicKey.toBase58()}</> : null}
                </p>
                <LoginPage/>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* TODO: Add Civic Button */}
            {/* <GatewayProvider
              connection={new Connection(clusterApiUrl("devnet"))}
              cluster="devnet"
              gatekeeperNetwork={ GATEKEEPER_NETWORK }> */}
              {/* TODO: Add identity button */}
              {/* <IdentityButton mode={ButtonMode.DARK} />
            </GatewayProvider> */}

            <div className="App">
            <ConnectionProvider endpoint={endpoint}>
                    <WalletModalProvider>
                        <Gateway />
                    </WalletModalProvider>
            </ConnectionProvider>
        </div>
            <ul className="text-left leading-10">
              {/* <li className="mb-5"> */}
                {/* <Link href="/gallery">
                  <a className="text-4xl font-bold hover:underline">
                    🏞 -- NFT Gallery
                  </a>
                </Link>
              </li>
              {/* <li className="mb-5">
                <Link href="/mint">
                  <a className="text-4xl font-bold hover:underline">
                    🍬 -- Candy Machine Mint UI
                  </a>
                </Link>
              </li> */}
              <li>
                {/* <Link href="/tweeter">
                  <a className="mb-5 text-4xl font-bold hover:underline">
                    🐦 -- Solana Tweeter
                  </a>
                </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};