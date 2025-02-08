export const getToken = () => {
  const token = localStorage.getItem("token");
  const expiryTime = localStorage.getItem("tokenExpiry");

  if (token && expiryTime && new Date().getTime() < expiryTime) {
    return token;
  }
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  return null;
};
