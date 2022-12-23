import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  route: "",
  isSignedIn: false,

  user: {
    sessioniduser: "",
    sessionidadmin: "",
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
      state.user.sessioniduser = action.payload.sessioniduser;
      state.user.sessionidadmin = action.payload.sessionidadmin;

      // state.user.tokken = action.payload[1];

      //set cookie
      var inHalfADay = 0.5;

      var sessioniduser = state.user.sessioniduser;
      var sessionidadmin = state.user.sessionidadmin;

      // var tokkenid = state.user.tokken;
      Cookies.set("sessioniduser", sessioniduser, {
        expires: inHalfADay,
      });
      Cookies.set("sessionidadmin", sessionidadmin, {
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
