import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  route: "",
  isSignedIn: false,

  user: {
    id: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    routeChange: (state, action) => {
      state.route = action.payload;
      //   window.location.pathname = action.payload;
    },
    loadUser: (state, action) => {
      state.user.id = action.payload.id;

      // state.user.tokken = action.payload[1];

      //set cookie
      var inHalfADay = 0.5;

      var userid = state.user.id;

      // var tokkenid = state.user.tokken;
      Cookies.set("id", userid, {
        expires: inHalfADay,
      });

      // Cookies.set("tokken", tokkenid, {
      //   expires: inHalfADay,
      // });
    },
  },
});

// Action creators are generated for each case reducer function
export const { routeChange, loadUser } = loginSlice.actions;

export default loginSlice.reducer;
