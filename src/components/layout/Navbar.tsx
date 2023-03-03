import { useAuth } from "contexts/auth.context";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button, FormInput, Logo, Modal, SearchBar, TextField } from "@comps";
import { ChangeEvent, FormEvent, useState } from "react";
import { DropdownMenu } from "components/ui/DropdownMenu";

const links = [
  {
    url: "/addPlace",
    label: "Add Place",
  },
];

const accountLinks = [
  {
    url: "/register",
    label: "Sign up",
    auth: false,
    bold: true,
  },
  {
    url: "#",
    label: "Log in",
    onclick: true,
    auth: false,
    bold: false,
  },
  {
    url: "/user/profile",
    label: "Profile",
    auth: true,
    bold: true,
  },
  {
    url: "/user/wishlist",
    label: "Wishlist",
    auth: true,
    bold: false,
    admin: true,
  },
  {
    url: "/user/admin",
    label: "Back Office",
    auth: true,
    bold: true,
    admin: true,
  },
  {
    url: "/logout",
    label: "Log out",
    auth: true,
    bold: false,
  },
];

export interface loginFormType {
  emailForm: string;
  passwordForm: string;
}
export default function Navbar() {
  const { user, login, roles } = useAuth();
  const { theme, setTheme } = useTheme();
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const [form, setForm] = useState<loginFormType>({
    emailForm: "",
    passwordForm: "",
  });

  const [open, setOpen] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email: form.emailForm, password: form.passwordForm });
  };

  return (
    <nav className="z-10 w-full border-b border-b-slate-200 bg-white dark:bg-gray-900 dark:border-b-slate-700 sticky top-0">
      <div className="container grid grid-cols-2 lg:grid-cols-3 mx-auto justify-between py-4 px-4">
        <Logo />
        <SearchBar />
        <div className="flex justify-end items-center">
          <ul className="flex items-center font-semibold text-sm justify-end">
            {links.map((link, index) => (
              <Link
                className={"text-slate-700 dark:text-slate-200"}
                href={link.url}
                key={index}
              >
                <li className="px-4 py-3 rounded-full cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800">
                  {link.label}
                </li>
              </Link>
            ))}
          </ul>
          <div
            id="profileMenu"
            className={`rounded-full flex items-center border ml-1 border-slate-300 dark:border-slate-700 ${
              user ? "text-red-500" : "text-slate-500 dark:text-slate-100 "
            } pr-1 pl-3 h-10 cursor-pointer gap-2`}
            onClick={() => setProfileMenu(!profileMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <DropdownMenu
            open={profileMenu}
            onClose={() => setProfileMenu((prev) => !prev)}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="absolute right-4 top-16 z-30 bg-white rounded-xl w-64 border border-slate-200 dark:bg-gray-900 dark:border-slate-800"
            >
              <div className="flex flex-col text-sm border-b-2 border-slate-200  dark:border-slate-800 py-2">
                {accountLinks.map((link, index) => {
                  if (link.auth === user) {
                    if (
                      link.admin === roles.includes("admin") ||
                      link.admin === undefined
                    ) {
                      return (
                        <Link
                          onClick={() => (link.onclick ? toggleModal() : false)}
                          key={index}
                          className="px-6 hover:bg-slate-50 hover:dark:bg-slate-800"
                          href={link.url}
                        >
                          <div
                            className={`${
                              link.bold ? "font-semibold" : ""
                            } my-2`}
                          >
                            {link.label}
                          </div>
                        </Link>
                      );
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                })}
              </div>
              <div className="flex flex-col font-light py-2 text-sm">
                <Link
                  className="px-6 hover:bg-slate-50  hover:dark:bg-slate-800"
                  href={"/addPlace"}
                >
                  <div className="my-2">Add Place</div>
                </Link>
              </div>
            </div>
          </DropdownMenu>
        </div>
      </div>
      <Modal open={open} onClose={toggleModal}>
        <div className="relative mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex p-4 justify-between items-center border-b border-slate-200 dark:border-gray-700">
            <button
              className="hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full p-2"
              onClick={toggleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="font-semibold">Log in</h2>
            <div className="w-6" />
          </div>
          {/* Content */}
          <div className="px-8 py-4 mt-4 max-h-vh overflow-y-auto">
            <FormInput classes="w-full px-4" submit={submit}>
              <TextField
                className="my-2"
                placeholder="john@doe.com"
                name="emailForm"
                id="emailForm"
                label="Email"
                change={change}
                required
              />
              <TextField
                className="my-2"
                placeholder="****"
                name="passwordForm"
                id="passwordForm"
                label="Password"
                change={change}
                type="password"
                required
              />

              <Button label="Login" type="submit" className="mt-4" />
            </FormInput>
          </div>
        </div>
      </Modal>
    </nav>
  );
}
