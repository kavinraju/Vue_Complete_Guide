export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      //id: new Date().toISOString(),
      //id: 'c3',
      //id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;
    console.log('token: ' + token);
    console.log('userId: ' + userId);

    const response = await fetch(
      `https://vue-http-demo-a41f5-default-rtdb.asia-southeast1.firebasedatabase.app/find-coaches-app/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    //const responseData = await reponse.json();

    if (!response.ok) {
      // error
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-http-demo-a41f5-default-rtdb.asia-southeast1.firebasedatabase.app/find-coaches-app/coaches.json`,
      {
        method: 'GET',
      }
    );
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      //error
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
