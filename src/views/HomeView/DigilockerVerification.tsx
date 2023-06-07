import { useState } from "react";
import axios from "axios";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const DigilockerVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const { setVisible } = useWalletModal();

  const handlePhoneNumberSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post("https://dg-sandbox.setu.co", { phoneNumber });

      const { otp } = response.data;

      setOTP(otp);
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (otp === "123456") {
        console.log("Verification Successful");

        setVisible(false);
      } else {
        console.log("Verification Failed");
      }
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-900 rounded-lg shadow-lg text-white">
      {!otp ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Enter Your Phone Number</h2>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full mb-4 bg-gray-800 text-white"
          />
          <button
            onClick={handlePhoneNumberSubmit}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            placeholder="OTP"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full mb-4 bg-gray-800 text-white" // Updated input field background and text color
          />
          <button
            onClick={handleVerificationSubmit}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            {loading ? "Verifying OTP..." : "Verify"}
          </button>
        </>
      )}
    </div>
  );
};

export default DigilockerVerification;
