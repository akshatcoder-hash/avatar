import { useRouter } from "next/router";

const RedirectButton: React.FC = () => {
  const router = useRouter();

  const handleRedirectClick = () => {
    const redirectUrl =
      "https://dg-sandbox.setu.co/okyc/initiate/ee765218-746e-425b-ae3e-6a991c042ce8";

    // Redirect the user to the specified URL
    window.open(redirectUrl, "_blank");
  };

  return (
    <button
      className="rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-[#0a387c] shadow-sm hover:bg-gray-200 mt-2"
      onClick={handleRedirectClick}
    >
      Login to Digilocker
    </button>
  );
};

export default RedirectButton;
