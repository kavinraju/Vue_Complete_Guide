let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },

  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZCb5o1Rn5p6q7n8fHEedvfqn8zZNDZJo';
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZCb5o1Rn5p6q7n8fHEedvfqn8zZNDZJo';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    console.log('responseData ');
    console.log(responseData);

    // store data locally
    const expiresIn = +responseData.expiresIn * 1000; // coverted to seconds | added + to make it number
    //const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    const dataPayload = {
      token: responseData.idToken,
      userId: responseData.localId,
      //tokenExpiration: expirationDate,
    };

    console.log('dataPayload ');
    console.log(dataPayload);

    // timer is set to automatically logout the user
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', dataPayload);
  },

  logout(context) {
    // remove the data saved locally
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    // clearing the on-going timer
    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
      //tokenExpiration: null,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    // timer is set to automatically logout the user
    const expiresIn = +tokenExpiration - new Date().getTime * 1000;
    if (expiresIn < 0) {
      // token expired
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        //tokenExpiration: null,
      });
    }
  },

  autoLogout(context) {
    console.log('autoLogout');
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
