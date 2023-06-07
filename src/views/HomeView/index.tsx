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

export const HomeView: FC = ({}) => {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [digilockerPIN, setDigilockerPIN] = useState("");
  const [digilockerVerified, setDigilockerVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const GATEKEEPER_NETWORK = new PublicKey(
    "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6"
  );

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(
    () => process.env.REACT_APP_RPC_ENDPOINT || clusterApiUrl(network),
    [network]
  );

  const handlePhoneNumberSubmit = () => {
    setLoading(true);
    // Simulating API call to send OTP to the provided phone number
    setTimeout(() => {
      setLoading(false);
      // Simulating receiving OTP
      setOTP("123456");
    }, 2000);
  };

  const handleVerificationSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      const isVerified = otp === "123456"; // Simulating successful OTP verification
      if (isVerified) {
        setIsVerified(true);
        try {
          const clientID = "YOUR_CLIENT_ID";
          const clientSecret = "YOUR_CLIENT_SECRET";
  
          const name = await authenticateWithDigilocker(clientID, clientSecret);
  
          if (name) {
            console.log("Verification Successful");
            console.log("User Name:", name);
            setDigilockerVerified(true); // Set the Digilocker verification status
          } else {
            console.log("DigiLocker Authentication Failed");
          }
        } catch (error) {
          console.error("Error authenticating with DigiLocker:", error);
        }
      } else {
        console.log("Verification Failed");
      }
    }, 2000);
  };

  const handleDigilockerVerification = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDigilockerVerified(true);
      console.log("Digilocker verification successful");
    } catch (error) {
      console.error("Digilocker verification failed:", error);
    } finally {
      setLoading(false);
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
                <p className="mb-5">Connect your wallet to get started.</p>
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
              {!phoneNumber ? (
                <button onClick={handlePhoneNumberSubmit} disabled={loading}>
                  Connect Wallet
                </button>
              ) : (
                <>
                  <h2>Enter Your Phone Number</h2>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                  />
                  <button onClick={handlePhoneNumberSubmit} disabled={loading}>
                    Send OTP
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <h2>Verify with Digilocker</h2>
              <form onSubmit={handleVerificationSubmit}>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Digilocker PIN:
                  <input
                    type="password"
                    value={digilockerPIN}
                    onChange={(e) => setDigilockerPIN(e.target.value)}
                  />
                </label>
                <br />
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <button type="submit" disabled={loading}>
                    Verify
                  </button>
                )}
              </form>
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
