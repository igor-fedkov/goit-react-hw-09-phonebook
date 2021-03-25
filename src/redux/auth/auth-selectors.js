const getIsAuthenticated  = state => state.auth.isAuthenticated;

const getUserName = state => state.auth.user.name;

const getToken = state => state?.auth?.token;

const authSelectors = {
  getIsAuthenticated,
  getUserName,
  getToken,
}

export default authSelectors;