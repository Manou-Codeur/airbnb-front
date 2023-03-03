import { getAccessToken } from "utils/accessToken";

export const loginService = async (body: Object) => {
  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const registerService = async (body: Object) => {
  const response = await fetch("http://localhost:4000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const logoutService = async () => {
  const response = await fetch("http://localhost:4000/api/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${getAccessToken()}`,
    },
  });

  return await response.json();
};
