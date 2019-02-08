const initialState = {
  id: 0,
  username: "",
  profile_pic: "",
  balance: 0
};

const UPDATE_USER = "UPDATE_USER";
const CLEAR_USER = "CLEAR_USER";

export function updateUser(userObj) {
  return {
    type: UPDATE_USER,
    payload: userObj
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      const { id, username, profile_pic, balance } = payload;
      return { ...state, id, username, profile_pic, balance };
    case CLEAR_USER:
      const user = {
        id: 0,
        username: "",
        profile_pic: "",
        balance: 0
      };
      return { ...state, ...user };
    default:
      return state;
  }
}
