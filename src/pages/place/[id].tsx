import { Button, FormInput, Loading, Modal, PageLayout, TextField } from "@comps";
import { useAlert } from "contexts/alert.context";
import { useAuth } from "contexts/auth.context";
import { useFilter } from "contexts/filter.context";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { deletePlace, getPlaceById, PlaceModel, reservePlace, updatePlace } from "services/place.service";
import { getPlaceTypes, PlaceTypeModel } from "services/placeType.service";

export default function Place() {
  const router = useRouter();
  const [data, setData] = useState<PlaceModel>();
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { setMessage, toggleOpenAlert, setType } = useAlert();

  const [open, setOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState("");

  const { wishlist, toggleFromWishlist } = useFilter();
  const { userInfo } = useAuth();

  const [types, setTypes] = useState<PlaceTypeModel[]>();
  const [form, setForm] = useState({
    title: data?.title,
    description: data?.description,
    type: data?.type,
    lat: data?.address.gps.lat,
    long: data?.address.gps.long,
    pricePerDay: data?.pricing.perDay,
    capacity: data?.capacity,
    country: data?.address.country,
    city: data?.address.city,
    zipcode: data?.address.zipCode,
    street: data?.address.street,
    images: data?.images.join(",") || "",
  });

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPlace = {
      _id: data?._id,
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
    updatePlace(newPlace).then((r) => {
      setType("success");
      setMessage(r.message);
      toggleOpenAlert();
    });
  };

  useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, []);

  useEffect(() => {
    getPlaceTypes().then((res) => {
      if (res) {
        setTypes(res.placeTypes);
      }
    });

    const fetchData = async (id: string) => {
      const data = await getPlaceById(id);
      return data;
    };

    if (router.isReady && loading) {
      fetchData(router.query.id as string).then((data) => {
        setData(data.place);
        setForm({
          title: data.place.title,
          description: data.place.description,
          type: data.place.type,
          lat: data.place.address.gps.lat,
          long: data.place.address.gps.long,
          pricePerDay: data.place.pricing.perDay,
          capacity: data.place.capacity,
          country: data.place.address.country,
          city: data.place.address.city,
          zipcode: data.place.address.zipCode,
          street: data.place.address.street,
          images: data.place.images.join(",") || "",
        });
        setRating(data.place.rating.length);
      });
    }

    setLoading(false);
    return () => {
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  const toggleUpdatePlaceModal = () => {
    setOpenUpdate((prev: boolean) => !prev);
  };

  const toggleDeleteModal = () => {
    setOpenDelete((prev: boolean) => !prev);
  };

  const reserve = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const newReservation = {
      place: data?._id,
      owner: data?.owner?._id,
      date: {
        from: fromDate,
        to: toDate,
      },
    };
    reservePlace(newReservation).then((res) => {
      if (res) {
        setType("success");
        setMessage(res.message);
        toggleOpenAlert();
      }
    });
  };

  const confirmDeletePlace = () => {
    deletePlace(data?._id).then((res) => {
      if (res) {
        setType("success");
        setMessage(res.message);
        toggleOpenAlert();
      }
    });
  };

  return !router.isReady && loading ? (
    <div className="h-screen">
      <Loading />
    </div>
  ) : (
    data && (
      <PageLayout title={data.title} withFooter={false}>
        <div className="flex flex-row items-center gap-2 justify-between">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          {userInfo === data?.owner?._id && (
            <div className="flex flex-row items-center gap-2">
              <button onClick={() => toggleUpdatePlaceModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button onClick={() => toggleDeleteModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="font-medium pt-2 flex flex-row justify-between">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">
              {rating} · <u>{data.rating?.length}</u> reviews ·{" "}
              <u>
                {data.address.street},{data.address.city},{data.address.country}
              </u>
            </span>
          </span>
          <div
            className={`cursor-pointer flex text-sm gap-1 items-center hover:underline`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFromWishlist(data._id);
            }}
          >
            <span>{wishlist.indexOf(data._id) !== -1 ? "Remove from wishlist" : "Add to wishlist"}</span>
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className={wishlist.indexOf(data._id) !== -1 ? "fill-current text-red-500" : "fill-current text-black/50"}
              stroke="white"
              strokeWidth={2}
              style={{ display: "block", height: "24px", width: "24px", overflow: "visible" }}
            >
              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-2 mt-8 overflow-hidden rounded-xl">
          {data.images.slice(0, 4).map((image, index) => (
            <div key={index} className={`relative aspect-square w-full h-full ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
              <Image className="aspect-square object-cover" src={image} fill alt={"image number " + index + " with the title: " + data.title} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-12">
          <div className="my-4 col-span-2">
            <h4 className="py-4">
              A nice <span className="font-medium">{data.type.name}</span> · That accepts {data.capacity} <span className="font-medium">guest{data.capacity > 1 && "s"}</span>
            </h4>
            <div className="border-b border-t border-slate-200 py-4 my-4">
              <h4 className="font-semibold text-xl pb-2 pt-4">Description</h4>
              <p className="pb-4">{data.description}</p>
            </div>
          </div>
          <div className="my-4 p-8 rounded-3xl border flex justify-between flex-col border-slate-200">
            <div>
              <div className="flex justify-between items-baseline">
                <div className="flex gap-2 items-baseline">
                  <h4 className="text-xl font-semibold">€ {data.pricing.perDay}</h4>
                  <span>day</span>
                </div>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">
                    {rating} · <u>{data.rating?.length}</u> reviews
                  </span>
                </span>
              </div>
              <Button label="Reserve" type="button" className="bg-gradient-to-r from-red-600 to-pink-700 text-white rounded-md" onClick={toggleModal} />
            </div>
            <div className="flex flex-row justify-between font-semibold pt-8 border-t border-slate-200">
              <p>Total</p>
              <p>€ {data.pricing.perDay}</p>
            </div>
          </div>
        </div>
        <Modal open={open} onClose={toggleModal}>
          <div className="relative mx-auto bg-white w-96 dark:bg-gray-900 rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex p-4 justify-between items-center border-b border-slate-200 dark:border-gray-700">
              <button className="hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full p-2" onClick={toggleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="font-semibold">Reservation dates</h2>
              <div className="w-6" />
            </div>
            {/* Content */}
            <div className="px-4 py-4 mt-4 max-h-vh w-full overflow-y-auto">
              <FormInput classes="w-full px-4" submit={reserve}>
                <div className="rounded-lg border border-slate-400 flex flex-col px-2.5 py-1.5 group group-focus:outline-2 group-focus:outline my-2 w-full">
                  <label htmlFor="fromDate" className="text-xs text-slate-500">
                    From
                  </label>
                  <div className="flex flex-row items-center gap-2 w-full">
                    <input
                      type="date"
                      min={fromDate}
                      name="fromDate"
                      id="fromDate"
                      onChange={(e) => setFromDate(e.target.value)}
                      required
                      className="outline-0 py-1 bg-transparent w-full"
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-slate-400 flex flex-col px-2.5 py-1.5 group group-focus:outline-2 group-focus:outline my-2 w-full">
                  <label htmlFor="toDate" className="text-xs text-slate-500">
                    To
                  </label>
                  <div className="flex flex-row items-center gap-2 w-full">
                    <input
                      min={fromDate}
                      type="date"
                      name="toDate"
                      id="toDate"
                      onChange={(e) => setToDate(e.target.value)}
                      required
                      className="outline-0 py-1 bg-transparent w-full"
                    />
                  </div>
                </div>

                <Button label="Confirm" type="submit" className="mt-4" />
              </FormInput>
            </div>
          </div>
        </Modal>
        <Modal open={openUpdate} onClose={toggleUpdatePlaceModal}>
          <div className="relative mx-auto bg-white w-full sm:w-2/3 dark:bg-gray-900 rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex p-4 justify-between items-center border-b border-slate-200 dark:border-gray-700">
              <button className="hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full p-2" onClick={toggleUpdatePlaceModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="font-semibold">Update Place</h2>
              <div className="w-6" />
            </div>
            {/* Content */}
            <div className="px-4 py-4 mt-4 max-h-vh w-full overflow-y-auto">
              <FormInput classes="w-full px-4 sm:px-0" submit={(e) => submit(e)}>
                <h1 className="text-4xl mb-4 font-bold">Updating place</h1>
                <TextField className="my-1" name="title" value={form.title} id="title" label="Title" change={change} required />
                <div className={`rounded-lg border border-slate-400 flex flex-col px-2.5 py-1.5 group group-focus:outline-2 group-focus:outline my-2`}>
                  <label htmlFor="description" className="text-xs text-slate-500">
                    Description
                  </label>
                  <div className="flex flex-row items-center gap-2">
                    <textarea className="my-2 w-full bg-transparent" name="description" value={form.description} id="description" onChange={(e) => change(e)} required></textarea>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    className="my-1"
                    name="pricePerDay"
                    value={form.pricePerDay}
                    id="pricePerDay"
                    label="Price / Day"
                    type="number"
                    change={change}
                    preInput={<span>€</span>}
                    required
                  />
                  <TextField
                    className="my-1"
                    name="capacity"
                    value={form.capacity}
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
                    <select className="my-2 w-full bg-transparent" name="type" value={form.type?._id} id="type" onChange={(e) => change(e)} required>
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
                <TextField className="my-1" name="country" value={form.country} id="country" label="Country" change={change} required />
                <div className="grid grid-cols-2 gap-2">
                  <TextField className="my-1" name="city" value={form.city} id="city" label="City" change={change} required />
                  <TextField className="my-1" name="zipcode" value={form.zipcode} id="zipcode" label="Zip Code" change={change} required />
                </div>
                <TextField className="my-1" name="street" value={form.street} id="street" label="Street" change={change} required />
                <div className="grid grid-cols-2 gap-2">
                  <TextField className="my-1" name="lat" value={form.lat} id="lat" label="Latitude (Optional)" type="number" change={change} />
                  <TextField className="my-1" name="long" value={form.long} id="long" label="Longitude (Optional)" type="number" change={change} />
                </div>
                <div className={`rounded-lg border border-slate-400 flex flex-col px-2.5 py-1.5 group group-focus:outline-2 group-focus:outline my-2`}>
                  <label htmlFor="images" className="text-xs text-slate-500">
                    Images (Links separated with commas)
                  </label>
                  <div className="flex flex-row items-center gap-2">
                    <textarea className="my-2 w-full bg-transparent" name="images" value={form.images} id="images" onChange={(e) => change(e)} required></textarea>
                  </div>
                </div>
                <Button type="submit" label="Register" />
              </FormInput>
            </div>
          </div>
        </Modal>
        <Modal open={openDelete} onClose={toggleDeleteModal}>
          <div className="relative mx-auto bg-white w-full dark:bg-gray-900 rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex p-4 justify-between items-center border-b border-slate-200 dark:border-gray-700">
              <button className="hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full p-2" onClick={toggleDeleteModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="font-semibold">Delete Place</h2>
              <div className="w-6" />
            </div>
            {/* Content */}
            <div className="px-4 py-4 mt-4 text-center max-h-vh w-full overflow-y-auto">
              <h1 className="text-xl">Are you sure you want to delete this place ?</h1>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button className="w-full px-4 py-3 mt-4 border border-slate-800 rounded text-md " onClick={toggleDeleteModal} type="button">
                  Cancel
                </button>
                <Button label="Confirm" type="submit" className="mt-4" onClick={confirmDeletePlace} />
              </div>
            </div>
          </div>
        </Modal>
      </PageLayout>
    )
  );
}
