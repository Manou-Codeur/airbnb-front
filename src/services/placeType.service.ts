import { getAccessToken } from "utils/accessToken";
import { API } from "utils/defaultValues";

export type PlaceTypeModel = {
  _id: string;
  name: string;
  image: string;
};

export async function getPlaceTypes() {
  try {
    const response = await fetch(API + "/placeTypes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function deletePlaceType(id) {
  try {
    const response = await fetch(API + "/placeTypes/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${getAccessToken()}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function updatePlaceType(data) {
  try {
    const response = await fetch(API + "/placeTypes/" + data._id, {
      method: "PUT",
      credentials: "include",
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
}
