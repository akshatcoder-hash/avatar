import { useState } from "react";
import axios from "axios";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const DigilockerVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOTPSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setVisible } = useWalletModal();

  const handlePhoneNumberSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post("https://dg-sandbox.setu.co", { phoneNumber });

      const { otp } = response.data;

      setOtpDigits(otp.split(""));
      setOTPSent(true);
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = () => {
    const enteredOTP = otpDigits.join("");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (enteredOTP === "123456") {
        console.log("Verification Successful");

        setVisible(false);
      } else {
        console.log("Verification Failed");
      }
    }, 2000);
  };

  const handleOTPChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-900 rounded-lg shadow-lg text-white">
      {!otpSent ? (
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
          <p className="text-white mb-4">
            An OTP has been sent to your phone. Please enter it below.
          </p>
          <div className="flex items-center justify-center mb-4">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                maxLength={1}
                className="border border-gray-300 px-4 py-2 rounded-lg mr-2 w-10 bg-gray-800 text-white text-center"
              />
            ))}
          </div>
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
