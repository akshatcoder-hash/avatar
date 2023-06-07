import axios from "axios";

const authenticateWithDigilocker = async (
  clientID: string,
  clientSecret: string
): Promise<string | null> => {
  try {
    // Request an access token from the DigiLocker API
    const tokenResponse = await axios.post(
      "https://api.digitallocker.gov.in/public/oauth2/1/token",
      {
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scope: "prod",
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get the user's name using the access token
    const userProfileResponse = await axios.get(
      "https://api.digitallocker.gov.in/public/rest/1/myinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const userName = userProfileResponse.data.name;

    return userName;
  } catch (error) {
    console.error("Error authenticating with DigiLocker:", error);
    return null;
  }
};

export default authenticateWithDigilocker;
