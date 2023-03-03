import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
// Components
import { TextField, FormInput, Button, PageLayout } from "@comps";
import { registerService } from "services/auth.service";
import { useAuth } from "contexts/auth.context";
import { useAlert } from "contexts/alert.context";

export interface registerFormType {
  firstName: string;
  lastName: string;
  emailConfirm: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function Register() {
  const [form, setForm] = useState<registerFormType>({
    firstName: "",
    lastName: "",
    emailConfirm: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { register } = useAuth();
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

    register(form);
  };

  return (
    <PageLayout title="Register" mainClass="grid place-items-center py-4">
      <FormInput classes="w-full px-4 sm:px-0 sm:w-1/2" submit={(e) => submit(e)}>
        <h1 className="text-4xl font-bold">Register</h1>
        <TextField className="my-2" name="firstName" id="firstName" label="First name" change={change} required />
        <TextField className="my-2" name="lastName" id="lastName" label="Last name" change={change} required />
        <TextField className="my-2" name="email" id="email" label="Email" type="email" change={change} required />
        <TextField className="my-2" name="emailConfirm" id="emailConfirm" label="Email (confirmation)" type="email" change={change} required />
        <TextField className="my-2" name="password" id="password" label="Password" type="password" change={change} required />
        <TextField className="my-2" name="passwordConfirm" id="passwordConfirm" label="Password (confirmation)" type="password" change={change} required />
        <Button type="submit" label="Register" />
      </FormInput>
    </PageLayout>
  );
}
