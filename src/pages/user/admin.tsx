import { Button, CarouselButton, Loading, Modal, PageLayout, TextField } from "@comps";
import { useAlert } from "contexts/alert.context";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getPlaceTypes, PlaceTypeModel, deletePlaceType, updatePlaceType } from "services/placeType.service";
import { getReservations, getUsers } from "services/user.service";
import withAuth from "utils/withAuth";

function Admin() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [placeTypes, setPlaceTypes] = useState<Array<PlaceTypeModel>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState({ _id: "", name: "", image: "" });
  const ref = useRef<HTMLDivElement>(null);
  const { setMessage, toggleOpenAlert, setType } = useAlert();

  const toggleModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.users);
    });
    getReservations().then((r) => {
      if (r) setReservations(r.reservations);
    });
    async function fetchData() {
      const data = await getPlaceTypes();
      setPlaceTypes(data.placeTypes);
    }
    if (loading) fetchData();
    setLoading(false);
  }, []);

  const scroll = (scrollOffset: number) => {
    if (ref.current !== null) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  const confirmDeletePlace = () => {
    deletePlaceType(form._id).then((res) => {
      if (res) {
        setType("success");
        setMessage(res.message);
        toggleOpenAlert();
      }
    });
  };

  const confirmUpdatePlace = () => {
    updatePlaceType(form).then((res) => {
      if (res) {
        setType("success");
        setMessage(res.message);
        toggleOpenAlert();
      }
    });
  };

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return loading ? (
    <Loading />
  ) : (
    <PageLayout title="Admin Panel">
      <h1 className="text-2xl mb-4 font-semibold">Admin Panel</h1>
      <h2 className="text-xl mb-4 font-semibold">Place types</h2>
      <div className="w-full relative">
        <CarouselButton onClick={() => scroll(-200)} variant="left" dropShadow hidden={false} withBorder />
        <div className="overflow-hidden scroll-smooth flex flex-row gap-10 snap-mandatory snap-x" ref={ref}>
          <div className="snap-start min-w-pt"></div>
          {placeTypes.map((placeTypeEl, index) => (
            <div
              key={index}
              onClick={() => {
                toggleModal();
                setForm(placeTypeEl);
              }}
              className={`w-20 snap-start flex flex-col items-center pt-4 cursor-pointer after:w-full after:h-0.5 after:mt-3`}
            >
              <div className="dark:bg-white rounded-md p-1">
                <Image width={24} height={24} src={placeTypeEl.image} alt={"place type with the title: " + placeTypeEl.name} />
              </div>
              <h1 className="text-xs whitespace-nowrap font-semibold mt-1">{placeTypeEl.name}</h1>
            </div>
          ))}
          <div className="snap-start min-w-pt"></div>
        </div>
        <CarouselButton onClick={() => scroll(200)} variant="right" dropShadow hidden={false} withBorder />
      </div>
      <Modal open={open} onClose={toggleModal}>
        <div className="relative mx-auto bg-white w-full dark:bg-gray-900 rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex p-4 justify-between items-center border-b border-slate-200 dark:border-gray-700">
            <button className="hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full p-2" onClick={toggleModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="font-semibold">Delete Place</h2>
            <div className="w-6" />
          </div>
          {/* Content */}
          <div className="px-4 py-4 mt-4 text-center max-h-vh w-full overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              <TextField className="my-1" name="name" value={form.name} id="name" label="Name" change={change} required />
              <TextField className="my-1" name="image" value={form.image} id="image" label="Image" change={change} required />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="w-full px-4 py-3 mt-4 border border-slate-800 rounded text-md " onClick={confirmDeletePlace} type="button">
                Delete
              </button>
              <Button label="Update" type="submit" className="mt-4" onClick={confirmUpdatePlace} />
            </div>
          </div>
        </div>
      </Modal>
      <h2 className="text-xl mb-4 pt-8 border-t border-slate-200 dark:border-slate-700 mt-8 font-semibold">Users</h2>
      <div className="flex flex-col text-sm">
        <div className="grid grid-cols-4 px-2 font-semibold rounded-t-md bg-slate-800 text-white dark:bg-slate-600 py-3">
          <p>Email</p>
          <p>First name</p>
          <p>Last name</p>
          <p>Roles</p>
        </div>
        {users.map((user, index) => (
          <div key={index} className={`grid py-3 px-2 grid-cols-4 ${index % 2 !== 0 ? "bg-slate-200 dark:bg-slate-800" : ""}`}>
            <p>{user.email}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.roles.join(", ")}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4 pt-8 border-t border-slate-200 dark:border-slate-700 mt-8">Reservations</h2>
      <div className="flex flex-col text-sm">
        <div className="grid grid-cols-6 px-2 font-semibold rounded-t-md bg-slate-800 text-white dark:bg-slate-600 py-3">
          <p>Place title</p>
          <p>Owner</p>
          <p>Customer</p>
          <p>From</p>
          <p>To</p>
          <p>Status</p>
        </div>
      </div>
      {reservations.length > 0 ? (
        reservations.map((reservation, index) => (
          <div key={index} className={`grid py-3 px-2 grid-cols-6 text-sm ${index % 2 !== 0 ? "bg-slate-200 dark:bg-slate-800" : ""}`}>
            <p>{reservation.place.title}</p>
            <p>{reservation.owner.firstName + " " + reservation.owner.lastName}</p>
            <p>{reservation.customer.firstName + " " + reservation.customer.lastName}</p>
            <p>{new Date(reservation.date.from).toLocaleString("fr").split(" ")[0]}</p>
            <p>{new Date(reservation.date.to).toLocaleString("fr").split(" ")[0]}</p>
            <p className={reservation.status === "pending" ? "text-yellow-600" : reservation.status === "accepted" ? "text-green-500" : "text-red-500"}>{reservation.status}</p>
          </div>
        ))
      ) : (
        <p className="p-2">No reservations found</p>
      )}
    </PageLayout>
  );
}

export default withAuth(Admin);
