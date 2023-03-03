import { Button, FormInput, Loading, PageLayout, TextField } from "@comps";
import { useAlert } from "contexts/alert.context";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { addPlace } from "services/place.service";
import { getPlaceTypes, PlaceTypeModel } from "services/placeType.service";
import withAuth from "utils/withAuth";

function AddPlace() {
  const [types, setTypes] = useState<PlaceTypeModel[]>();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    lat: 0,
    long: 0,
    pricePerDay: 0,
    capacity: "",
    country: "",
    city: "",
    zipcode: 0,
    street: "",
    images: "",
  });

  const { setMessage, toggleOpenAlert, setType } = useAlert();

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      pricing: {
        perDay: form.pricePerDay,
      },
      address: {
        gps: {
          lat: form.lat,
          long: form.long,
        },
        country: form.country,
        city: form.city,
        street: form.street,
        zipCode: form.zipcode,
      },
      title: form.title,
      type: form.type,
      images: form.images.split(","),
      capacity: form.capacity,
      description: form.description,
    };
    addPlace(data).then((r) => {
      setType("success");
      setMessage(r.message);
      toggleOpenAlert();
    });
  };

  useEffect(() => {
    getPlaceTypes().then((res) => {
      if (res) {
        setTypes(res.placeTypes);
        setLoading(false);
      }
    });

    return () => {
      setLoading(true);
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <PageLayout title="New Place" mainClass="grid place-items-center py-4">
      <FormInput classes="w-full px-4 sm:px-0 sm:w-1/2" submit={(e) => submit(e)}>
        <h1 className="text-4xl mb-4 font-bold">Adding a new place</h1>
        <TextField className="my-1" name="title" id="title" label="Title" change={change} required />
        <div className={`rounded-lg border border-slate-400 flex flex-col px-2.5 py-1.5 group group-focus:outline-2 group-focus:outline my-2`}>
          <label htmlFor="description" className="text-xs text-slate-500">
            Description
          </label>
          <div className="flex flex-row items-center gap-2">
            <textarea className="my-2 w-full bg-transparent" name="description" id="description" onChange={(e) => change(e)} required></textarea>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <TextField className="my-1" name="pricePerDay" id="pricePerDay" label="Price / Day" type="number" change={change} preInput={<span>€</span>} required />
          <TextField
            className="my-1"
            name="capacity"
            id="capacity"
            label="Capacity"
            type="number"
            change={change}
            preInput={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
            }
            required
          />
        </div>
        <div className={`rounded-lg border border-slate-400 flex flex-col px-2.5 py-1.5 group group-focus:outline-2 group-focus:outline my-1`}>
          <label htmlFor="type" className="text-xs text-slate-500">
            Place type
          </label>
          <div className="flex flex-row items-center gap-2">
            <select className="my-2 w-full bg-transparent" name="type" id="type" onChange={(e) => change(e)} required>
              <option className="dark:bg-gray-900 dark:text-white" value="">
                Select a category
              </option>
              {types?.map((placeType, index) => (
                <option className="dark:bg-gray-900 dark:text-white" key={index} value={placeType._id}>
                  {placeType.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <TextField className="my-1" name="country" id="country" label="Country" change={change} required />
        <div className="grid grid-cols-2 gap-2">
          <TextField className="my-1" name="city" id="city" label="City" change={change} required />
          <TextField className="my-1" name="zipcode" id="zipcode" label="Zip Code" change={change} required />
        </div>
        <TextField className="my-1" name="street" id="street" label="Street" change={change} required />
        <div className="grid grid-cols-2 gap-2">
          <TextField className="my-1" name="lat" id="lat" label="Latitude (Optional)" type="number" change={change} />
          <TextField className="my-1" name="long" id="long" label="Longitude (Optional)" type="number" change={change} />
        </div>
        <div className={`rounded-lg border border-slate-400 flex flex-col px-2.5 py-1.5 group group-focus:outline-2 group-focus:outline my-2`}>
          <label htmlFor="images" className="text-xs text-slate-500">
            Images (Links separated with commas)
          </label>
          <div className="flex flex-row items-center gap-2">
            <textarea className="my-2 w-full bg-transparent" name="images" id="images" onChange={(e) => change(e)} required></textarea>
          </div>
        </div>
        <Button type="submit" label="Register" />
      </FormInput>
    </PageLayout>
  );
}

export default withAuth(AddPlace);
