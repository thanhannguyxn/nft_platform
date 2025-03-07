const handleLogout = (navigate) => {
  try {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_token');
    sessionStorage.clear();
    navigate('/signin'); // Redirect to sign-in page
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default handleLogout; // Ensure default export
