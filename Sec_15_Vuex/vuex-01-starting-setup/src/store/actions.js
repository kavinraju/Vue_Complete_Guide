export default {
  // ~methods(async)
  // can be asynchronous
  // should not manipulate the state(data) from actions, always use mutations for it.

  login(context) {
    context.commit('setAuth', { isAuth: true });
  },
  logout(context) {
    context.commit('setAuth', { isAuth: false });
  },
};
