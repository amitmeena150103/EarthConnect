import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("authorization");
const initialState = {
  userinfo: token ? jwtDecode(token) : null,
  loading: false,
};

export const userinfoSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.userinfo = user;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userinfoSlice.actions;
export default userinfoSlice.reducer;
