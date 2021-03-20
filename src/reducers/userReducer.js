import * as actions from '../actions/userAction';

export const userReducer = (user, { type, payload }) => {
  console.log('userReducer() : ', type, payload);

  switch (type) {
    case actions.LOGIN:
      return { ...user, isLogin: true, user: payload };

    case actions.LOGOUT:
      return { ...user, isLogin: false, user: null };

    case actions.SET_HISTORY:
      return { ...user, history: payload };

    default:
      break;
  }
};
