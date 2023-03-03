import { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
// Components
import { useAuth } from "contexts/auth.context";
import { PageLayout } from "@comps";
import { useRouter } from "next/router";

export default function Login(): JSX.Element {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      logout();
    } else {
      router.push("/");
    }
  });

  return (
    <PageLayout title="Login" mainClass="grid place-items-center">
      <h1 className="text-4xl font-bold">Logging out...</h1>
    </PageLayout>
  );
}
