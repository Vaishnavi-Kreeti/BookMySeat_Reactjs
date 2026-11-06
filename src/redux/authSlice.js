import { createSlice } from "@reduxjs/toolkit";

export function getUserRole(user) {
  if (user?.role === "admin") return "admin";
  if (user?.role === "customer" || user?.role === "user") return "customer";
  return null;
}

export function normalizeAuthUser(user) {
  const role = getUserRole(user);
  if (
    !user ||
    (typeof user.id !== "number" && typeof user.id !== "string") ||
    typeof user.name !== "string" ||
    !user.name.trim() ||
    typeof user.email !== "string" ||
    !user.email.trim() ||
    !role
  ) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role,
  };
}

function getStoredUser() {
  try {
    return normalizeAuthUser(JSON.parse(localStorage.getItem("loggedInUser") || "null"));
  } catch {
    return null;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: getStoredUser(),
  },
  reducers: {
    login: (state, action) => {
      state.loggedInUser = normalizeAuthUser(action.payload);
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
