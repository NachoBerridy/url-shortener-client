import axios from 'axios';
//Get user data
export const getUser = async (token: string) => {
  console.log('Getting user data ', token);
  const response = await axios.get(
    "http://127.00.1:8000/users/me",
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

  if (response.status == 200) {
    return response.data;
  } else {
    return { error: "Unauthorized" };
  }
}


export const getUsersUrls = async (token: string) => {
  const response = await axios.get(
    "http://127.00.1:8000/url/me",
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

  if (response.status == 200) {
    return response.data;
  } else {
    return { error: "Unauthorized" };
  }
}
