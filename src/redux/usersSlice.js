import { createSlice } from "@reduxjs/toolkit";

function getStoredUsers() {
  try {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    return Array.isArray(storedUsers) ? storedUsers : [];
  } catch {
    return [];
  }
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: getStoredUsers(),
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loadUsers: (state, action) => {
      state.users = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const { registerUser, loadUsers } = usersSlice.actions;
export default usersSlice.reducer;
