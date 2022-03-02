export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
    //state.tokenExpiration = payload.tokenExpiration;

    console.log('payload ');
    console.log(payload);

    console.log('state.token  ');
    console.log(state.token);
    console.log('state.userId  ');
    console.log(state.userId);
  },
  setAutoLogout(state) {
    console.log('setAutoLogout: ' + state.didAutoLogout);

    state.didAutoLogout = true;

    console.log('after setAutoLogout: ' + state.didAutoLogout);
  },
};
