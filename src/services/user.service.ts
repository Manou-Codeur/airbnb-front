import { getAccessToken } from "utils/accessToken";

export const getDetails = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUserPlaces = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/userPlaces", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUserReservations = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/userReservations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getReservations = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/reservations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getRequests = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateReservation = async (data: any) => {
  try {
    const response = await fetch("http://localhost:4000/api/reservations/" + data._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/api/users/" + data._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
