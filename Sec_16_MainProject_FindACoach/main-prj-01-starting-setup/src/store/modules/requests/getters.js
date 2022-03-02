export default {
  //requests(state) {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    //return state.requests;
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
