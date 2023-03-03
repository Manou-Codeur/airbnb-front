import { getAccessToken } from "utils/accessToken";
import { API } from "utils/defaultValues";
import type { PlaceTypeModel } from "./placeType.service";

export type PlaceModel = {
  pricing: {
    perDay: number;
  };
  address: {
    gps: {
      lat: number;
      long: number;
    };
    city: string;
    street: string;
    zipCode: number;
    country: string;
  };
  _id: string;
  title: string;
  type: PlaceTypeModel;
  owner?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  images: [string];
  capacity: number;
  description: string;
  rate?: number;
  rating?: [];
};

export async function getPlaces() {
  try {
    const response = await fetch(API + "/places", {
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

export async function getPlaceById(id: string) {
  try {
    const response = await fetch(API + "/places/" + id, {
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

export async function addPlace(data: any) {
  try {
    const response = await fetch(API + "/places", {
      method: "POST",
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

export async function updatePlace(data: any) {
  try {
    const response = await fetch(API + "/place/" + data._id, {
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

export async function reservePlace(data: any) {
  try {
    const response = await fetch(API + "/reservations", {
      method: "POST",
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

export async function deletePlace(id: string) {
  try {
    const response = await fetch(API + "/place/" + id, {
      method: "DELETE",
      credentials: "include",
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
