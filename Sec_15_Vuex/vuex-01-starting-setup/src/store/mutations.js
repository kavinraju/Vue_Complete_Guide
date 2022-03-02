export default {
  // ~methods
  // must be synchronous

  setAuth(state, payload) {
    state.isLoggedIn = payload.isAuth;
  },
};
