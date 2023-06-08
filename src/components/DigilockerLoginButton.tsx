import axios from 'axios';
import { useState } from 'react';

const DigilockerLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  const handleLoginClick = async () => {
    setIsLoading(true);

    try {
      // Replace 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' with your actual values
      const clientId = 'YOUR_CLIENT_ID';
      const clientSecret = 'YOUR_CLIENT_SECRET';

      const response = await axios.post(
        'https://dg-sandbox.setu.co/api/okyc',
        {
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }
      );

      console.log(response.data); // Handle the response data as per your requirement
      
      // Display success message on successful login
      setLoginStatus('LOGIN SUCCESSFULLY');
    } catch (error) {
      console.error('Failed to log in to Digilocker', error);

      // Display failure message on login failure
      setLoginStatus('LOGIN FAILED');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={handleLoginClick} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login to Digilocker'}
      </button>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
};

export default DigilockerLoginButton;
