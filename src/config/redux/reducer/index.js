const initialState = {
  popup: false,
  isLogin: false,
  isLoading: false,
  username: "Nikko",
  dataUser: null,
  datas: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_POPUP":
      return {
        ...state,
        popup: action.value,
      };
      break;
    case "CHANGE_LOGIN":
      return {
        ...state,
        isLogin: action.value,
      };
      break;
    case "CHANGE_DATAUSER":
      return {
        ...state,
        dataUser: action.value,
      };
      break;
    case "CHANGE_ISLOADING":
      return {
        ...state,
        isLoading: action.value,
      };
      break;
    case "CHANGE_USERNAME":
      return {
        ...state,
        username: action.value,
      };
      break;
    case "SET_DATAS":
      return {
        ...state,
        datas: action.value,
      };
      break;
    default:
      return state;
  }
};
export default rootReducer;
