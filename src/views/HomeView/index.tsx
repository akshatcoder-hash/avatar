import Link from "next/link";
import { FC, useMemo, useState } from "react";
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
import { Connection, clusterApiUrl } from "@solana/web3.js";
import styles from "./index.module.css";
import { PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import authenticateWithDigilocker from "./digilockerAuthentication";
import DigilockerVerification from "./DigilockerVerification";

export const HomeView: FC = ({}) => {
  const { publicKey } = useWallet();
  const [isVerified, setIsVerified] = useState(false);

  const GATEKEEPER_NETWORK = new PublicKey(
    "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6"
  );

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(
    () => process.env.REACT_APP_RPC_ENDPOINT || clusterApiUrl(network),
    [network]
  );

  const handleDigilockerVerification = async () => {
    try {
      const clientID = "YOUR_CLIENT_ID";
      const clientSecret = "YOUR_CLIENT_SECRET";

      const name = await authenticateWithDigilocker(clientID, clientSecret);

      if (name) {
        console.log("Verification Successful");
        console.log("User Name:", name);
        setIsVerified(true);
      } else {
        console.log("DigiLocker Authentication Failed");
      }
    } catch (error) {
      console.error("Error authenticating with DigiLocker:", error);
    }
  };

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
                <h1 className="mb-5 text-5xl font-bold">Avatar</h1>
                <p className="mb-5">On Chain KYC Verification System.</p>
                <p>
                  {publicKey ? <>Your address: {publicKey.toBase58()}</> : null}
                </p>
              </div>
            </div>
          </div>

          <ul className="text-left leading-10">
            {/* <li className="mb-5">
              <Link href="/gallery">
                <a className="text-4xl font-bold hover:underline">
                  🏞 -- NFT Gallery
                </a>
              </Link>
            </li>
            <li className="mb-5">
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

          {!isVerified ? (
            <>
              <h2>Connect Wallet and Verify</h2>
              <p>Click the button below to start the verification process.</p>
              <WalletProvider wallets={[PhantomWalletAdapter]} autoConnect>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletModalProvider>
                    <DigilockerVerification />
                  </WalletModalProvider>
                </ConnectionProvider>
              </WalletProvider>
            </>
          ) : (
            <>
              <h2>Verified Successfully</h2>
              <p>Your verification is successful.</p>
            </>
          )}
          <button
            onClick={handleDigilockerVerification}
            className="btn btn-primary mt-4"
          >
            Verify with Digilocker
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
