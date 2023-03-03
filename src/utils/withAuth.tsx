import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "contexts/auth.context";

const withAuth = (Component: NextPage) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { user, checkUserLoggedIn } = useAuth();

    let checked = false;

    useEffect(() => {
      if (!user) {
        if (!checked) {
          checkUserLoggedIn();
          checked = true;
        } else {
          router.push("/");
        }
      }
    }, [user]);

    return !user ? <h1>Redirecting...</h1> : <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
