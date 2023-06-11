import { useRouter } from "next/router";

const RedirectButton: React.FC = () => {
  const router = useRouter();

  const handleRedirectClick = () => {
    const redirectUrl =
      "https://dg-sandbox.setu.co/okyc/initiate/8f96e5df-392e-4f49-89f9-835d309c79bb/";

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
