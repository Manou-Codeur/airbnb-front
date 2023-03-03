import { Button, FormInput, Loading, PageLayout, PlacesGrid, TextField } from "@comps";
import { useAlert } from "contexts/alert.context";
import { registerFormType } from "pages/register";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getUserPlaces, getDetails, updateUser, getUserReservations, updateReservation, getRequests } from "services/user.service";
import withAuth from "utils/withAuth";

function Profile(): JSX.Element {
  const [places, setPlaces] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<registerFormType>({
    firstName: "",
    lastName: "",
    emailConfirm: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { setMessage, toggleOpenAlert, setType } = useAlert();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.passwordConfirm || form.email !== form.emailConfirm) {
      setType("error");
      setMessage("Password/email and the password/email confirmation do not correspond");
      toggleOpenAlert();
      return;
    }

    updateUser(form).then((r) => {
      if (r.updated) {
        setType("success");
        setMessage("Profile updated successfully");
        toggleOpenAlert();
      }
    });
  };

  useEffect(() => {
    if (loading) {
      getUserPlaces()
        .then((r) => {
          if (r) setPlaces(r.places);
        })
        .catch((err) => {
          console.log(err);
          setType("error");
          setMessage(err);
          toggleOpenAlert();
        });
      getUserReservations().then((r) => {
        if (r) setReservations(r.reservations);
      });
      getRequests().then((r) => {
        if (r) setRequests(r.reservations);
      });
      getDetails().then((r) => {
        if (r) setForm({ ...r.user, emailConfirm: r.user.email, password: "" });
      });
      setLoading(false);
    }
  }, [loading]);

  return loading ? (
    <Loading />
  ) : (
    <PageLayout title="Profile">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <FormInput classes="w-full px-4 sm:px-0" submit={(e) => submit(e)}>
        <div className="grid grid-cols-2 gap-x-4">
          <TextField className="my-2 w-full" name="firstName" value={form.firstName} id="firstName" label="First name" change={change} required />
          <TextField className="my-2 w-full" name="lastName" value={form.lastName} id="lastName" label="Last name" change={change} required />
          <TextField className="my-2 w-full" name="email" value={form.email} id="email" label="Email" type="email" change={change} required />
          <TextField className="my-2 w-full" name="emailConfirm" value={form.emailConfirm} id="emailConfirm" label="Email (confirmation)" type="email" change={change} required />
          <TextField className="my-2 w-full" name="password" value={form.password} id="password" label="Password" type="password" change={change} required />
          <TextField
            className="my-2 w-full"
            name="passwordConfirm"
            value={form.passwordConfirm}
            id="passwordConfirm"
            label="Password (confirmation)"
            type="password"
            change={change}
            required
          />
        </div>
        <Button type="submit" label="Update" />
      </FormInput>
      <h2 className="text-xl font-semibold mb-4 pt-8 border-t border-slate-200 dark:border-slate-700 mt-8">My Places</h2>
      {places.length > 0 ? <PlacesGrid places={places} /> : <p>No places found</p>}
      <h2 className="text-xl font-semibold mb-4 pt-8 border-t border-slate-200 dark:border-slate-700 mt-8">My Reservations</h2>
      <div className="flex flex-col text-sm">
        <div className="grid grid-cols-7 gap-1 break-words px-2 font-semibold rounded-t-md bg-slate-800 text-white dark:bg-slate-600 py-3">
          <p>Place title</p>
          <p>Email</p>
          <p>First name</p>
          <p>Last name</p>
          <p>From</p>
          <p>To</p>
          <p>Status</p>
        </div>
      </div>
      {reservations.length > 0 ? (
        reservations.map((reservation, index) => (
          <div key={index} className={`grid py-3 px-2 break-words gap-1 grid-cols-7 text-sm ${index % 2 !== 0 ? "bg-slate-200 dark:bg-slate-800" : ""}`}>
            <p>{reservation.place.title}</p>
            <p>{reservation.owner.email}</p>
            <p>{reservation.owner.firstName}</p>
            <p>{reservation.owner.lastName}</p>
            <p>{new Date(reservation.date.from).toLocaleString("fr").split(" ")[0]}</p>
            <p>{new Date(reservation.date.to).toLocaleString("fr").split(" ")[0]}</p>
            <p className={reservation.status === "pending" ? "text-yellow-500" : reservation.status === "accepted" ? "text-green-500" : "text-red-500"}>{reservation.status}</p>
          </div>
        ))
      ) : (
        <p className="p-2">No reservations found</p>
      )}
      <h2 className="text-xl font-semibold mb-4 pt-8 border-t border-slate-200 dark:border-slate-700 mt-8">Requests</h2>
      <div className="flex flex-col text-sm">
        <div className="grid grid-cols-9 px-2 gap-1 break-words font-semibold rounded-t-md bg-slate-800 text-white dark:bg-slate-600 py-3">
          <p>Place title</p>
          <p>Email</p>
          <p>First name</p>
          <p>Last name</p>
          <p>From</p>
          <p>To</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
      </div>
      {requests.length > 0 ? (
        requests.map((reservation, index) => (
          <div key={index} className={`grid py-3 px-2 break-words grid-cols-9 gap-1 items-center text-sm ${index % 2 !== 0 ? "bg-slate-200 dark:bg-slate-800" : ""}`}>
            <p>{reservation.place.title}</p>
            <p>{reservation.customer.email}</p>
            <p>{reservation.customer.firstName}</p>
            <p>{reservation.customer.lastName}</p>
            <p>{new Date(reservation.date.from).toLocaleString("fr").split(" ")[0]}</p>
            <p>{new Date(reservation.date.to).toLocaleString("fr").split(" ")[0]}</p>
            <p className={reservation.status === "pending" ? "text-yellow-500" : reservation.status === "accepted" ? "text-green-500" : "text-red-500"}>{reservation.status}</p>
            <p className="flex flex-row gap-2 col-span-2">
              <Button
                type="button"
                label="Accept"
                disabled={reservation.status !== "pending"}
                onClick={async () => {
                  await updateReservation({ _id: reservation._id, status: "accepted" });
                  setLoading(true);
                }}
                className="bg-green-600 hover:bg-green-500 disabled:bg-slate-300"
              />
              <Button
                type="button"
                label="Refuse"
                disabled={reservation.status !== "pending"}
                onClick={async () => {
                  await updateReservation({ _id: reservation._id, status: "accepted" });
                  setLoading(true);
                }}
                className="bg-red-600 hover:bg-red-500 disabled:bg-slate-300"
              />
            </p>
          </div>
        ))
      ) : (
        <p className="p-2">No reservations found</p>
      )}
    </PageLayout>
  );
}

export default withAuth(Profile);
