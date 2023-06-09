/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { useState } from "react";
import { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import {
  IdentityButton,
  ButtonMode,
  GatewayProvider,
} from "@civic/solana-gateway-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import TextGradientComponent from "components/text-gradient";
import dynamic from "next/dynamic";
import Image from "next/image";
import DigilockerLoginButton from "components/DigilockerLoginButton";

const Terrain = dynamic(() => import("components/threejs/terrain"), {
  ssr: false,
});

export const HomeView: FC = ({}) => {
  const { publicKey } = useWallet();

  const onClick = () => {};
  const GATEKEEPER_NETWORK = new PublicKey(
    "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6"
  );

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(
    () => process.env.REACT_APP_RPC_ENDPOINT || clusterApiUrl(network),
    [network]
  );

  // TODO: Initiate IdentityButton
  const Content = () => {
    const wallet = useWallet();
    return (
      <header className="App-header">
        {wallet.connected && <IdentityButton />}
      </header>
    );
  };

  const LoginPage = () => {
    return (
      <div className="mb-4">
        <DigilockerLoginButton />
      </div>
    );
  };

  const Gateway = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    return (
      <GatewayProvider
        connection={connection}
        wallet={wallet}
        gatekeeperNetwork={new PublicKey(GATEKEEPER_NETWORK)}
      >
        <Content />
      </GatewayProvider>
    );
  };
  return (
    <div className="relative bg-[#0a387c]">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/">
              <div className="flex items-center gap-2">
                <img className="w-32" src="/avatar_logo_h.png" alt="" />
              </div>
            </Link>
          </div>
          <div className="hidden flow-root mt-0 sm:block">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="flex items-center py-6 space-x-4">
                <WalletMultiButton>Get started</WalletMultiButton>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative isolate pt-14">
        <div className="py-20 sm:py-28 lg:pb-40">
          <div>
            <div className="mx-auto text-center max-w-7xl">
              <TextGradientComponent>
                <span className="text-4xl font-satoshi-bold tracking-wider text-white sm:text-8xl">
                  OnChain KYC
                </span>
              </TextGradientComponent>
              <p className="mt-6 leading-8 font-satoshi-medium text-gray-300 text-md sm:text-xl">
                Connect your wallet to get started
              </p>
              <p className="mt-6 leading-8 font-satoshi-medium text-gray-300 text-md sm:text-xl mb-4">
                {publicKey ? <>Your address: {publicKey.toBase58()}</> : null}
              </p>
              <LoginPage />
              <ConnectionProvider endpoint={endpoint}>
                <WalletModalProvider>
                  <Gateway />
                </WalletModalProvider>
              </ConnectionProvider>
            </div>
            <Terrain />
          </div>
        </div>
      </div>
    </div>
  );
};
