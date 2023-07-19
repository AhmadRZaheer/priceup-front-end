import { createSlice } from "@reduxjs/toolkit";

const UserAuth = createSlice({
  name: "userAuth",
  initialState: {
    token: "",
    isLoggedIn: false,
    Useremail: "",
  },
  reducers: {

    logoutHandler: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.expireTime = "";
      localStorage.clear();
    },
    loginHandler: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      state.Useremail = localStorage.getItem("email");
      localStorage.setItem("token", token);
    },
  },
});

export const { loginHandler, logoutHandler } = UserAuth.actions;
export default UserAuth.reducer;
