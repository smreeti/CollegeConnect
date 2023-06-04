import { API_TO_VERIFY_REFRESH_TOKEN } from "./APIRequestUrl";

const fetchData = async (url, method, body = null) => {

  try {
    const accessToken = localStorage.getItem('jwt');
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: body ? JSON.stringify(body) : null
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else if (response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        localStorage.setItem('jwt', newAccessToken);
        requestOptions.headers.Authorization = `Bearer ${newAccessToken}`;
        return fetch(url, requestOptions).then(response => response.json());
      } else {
        console.log("Error:", data.error);
        return { error: data.error };
      }
    } else {
      console.log("Error:", data.error);
      return { error: data.error };
    }
  } catch (error) {
    console.log("Error:", error);
    return { error: error.message };
  }
};

// Function to refresh the access token using the refresh token
const refreshAccessToken = async (refreshToken) => {
  const refreshRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  };

  const refreshResponse = await fetch(API_TO_VERIFY_REFRESH_TOKEN, refreshRequestOptions);
  const refreshData = await refreshResponse.json();

  if (refreshResponse.ok) {
    const newAccessToken = refreshData.body.newAccessToken;
    return newAccessToken;
  } else {
    localStorage.clear();
    window.location = '/';
  }
};

export default fetchData;