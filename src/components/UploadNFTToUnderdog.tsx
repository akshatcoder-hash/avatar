import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface VerificationData {
  name: string;
  ipfsLink: string;
  receiverAddress: string;
}

const UploadNFTToUnderdog = () => {
  const router = useRouter();
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const handleVerificationSuccess = (data: VerificationData) => {
    setVerificationData(data);
    setUploadStatus("Uploading NFT...");
    uploadNFT(data);
  };

  const handleVerificationError = (error: Error) => {
    setError(error);
    setUploadStatus("Verification failed");
  };

  const uploadNFT = async (data: VerificationData) => {
    const { name, ipfsLink, receiverAddress } = data;
    const token = process.env.UNDERDOG_PROTOCOL_API_KEY;

    const requestData = {
      name: name,
      image: ipfsLink,
      receiverAddress: receiverAddress,
    };

    try {
      const response = await axios.post(
        "https://api.underdogprotocol.com/v2/projects/t/1/nfts",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const mintAddress = response.data.mintAddress;
      setUploadStatus("NFT uploaded successfully");
    } catch (error) {
      setError(error as Error);
      setUploadStatus("NFT upload failed");
    }
  };

  const handleRedirectClick = () => {
    const redirectUrl = "https://dg-sandbox.setu.co/okyc/initiate/ee765218-746e-425b-ae3e-6a991c042ce8L";
    window.open(redirectUrl, "_blank");
  };

  return (
    <div>
      {!verificationData ? (
        <button onClick={handleRedirectClick}>Verify with Digilocker</button>
      ) : (
        <div>
          <h3>Verification Data:</h3>
          <p>Name: {verificationData.name}</p>
          <p>IPFS Link: {verificationData.ipfsLink}</p>
          <p>Receiver Address: {verificationData.receiverAddress}</p>
        </div>
      )}

      {error && <p>Error: {error.message}</p>}
      <p>Status: {uploadStatus}</p>
    </div>
  );
};

export default UploadNFTToUnderdog;
