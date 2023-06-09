import { useRouter } from 'next/router';

const RedirectButton: React.FC = () => {
  const router = useRouter();

  const handleRedirectClick = () => {
    const redirectUrl = 'https://accounts.digitallocker.gov.in/oauth_partner/register/%252Foauth2%252F1%252Fconsent%253Fresponse_type%253Dcode%2526client_id%253D5FF85A83%2526state%253D2d3e8765-9cb7-4c5a-a245-0c4e6771fa43%252521LzRiYjc1OWZmLWE3MTctNDUwNS1hZWVhLWVhNWFhZGVjYjQzYi8%25253D%252526%25252334%25253B%2526redirect_uri%253Dhttps%25253A%25252F%25252Fdg-sandbox.setu.co%25252Fapi%25252Fdigilocker%25252Fcallback%2526code_challenge%253D_rJt8ezQ_6e2_Smh9_qMvctWEm2aM6VVHb2x7Y7kj2A%2526code_challenge_method%253DS256%2526scope%253Dopenid%2526orgid%253D003533%2526txn%253D6482ce8cf04b4oauth21686294157%2526hashkey%253D6a6b1c95a2c3e324c70ecb0a68f8a58bd9f5c3d384f653275d47c435121d6fa9%2526requst_pdf%253DN%2526app_name%253DU2V0dSBTYW5kYm94IEFwcA%25253D%25253D%2526disable_userpwd_login%253D1%2526aadhaar_only%253DY%2526partner_name%253DQnJva2VudHVzayBUZWNobm9sb2dpZXMgUHZ0IEx0ZA%25253D%25253D%2526authMode%253DO';

    // Redirect the user to the specified URL
    window.open(redirectUrl, '_blank');  };

  return (
    <button onClick={handleRedirectClick}>Login to Digilocker</button>
  );
};

export default RedirectButton;
