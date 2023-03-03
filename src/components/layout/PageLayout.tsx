import type { MouseEvent, ReactNode } from "react";
import Head from "next/head";
// Components
import Footer from "./Footer";
import Navbar from "./Navbar";

import Alert from "./Alert";
import { useAlert } from "contexts/alert.context";

interface propsType {
  children: ReactNode;
  title: string;
  description?: string;
  keywords?: string;
  mainClass?: string;
  withFooter?: boolean;
}

export const PageLayout = (props: propsType) => {
  const {
    children,
    title = "Next GraphQL",
    description = "NextJS project using GraphQL back",
    keywords = "app, user, nextjs",
    mainClass = "grow my-4",
    withFooter = true,
  } = props;

  const { openAlert, handleClose, message, toggleOpenAlert, setMessage } =
    useAlert();

  return (
    <div className="min-h-screen grid grid-rows-main">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={"container px-4 mx-auto " + mainClass}>{children}</main>
      {withFooter && <Footer />}
      <div className="fixed top-4 right-4 z-50">
        <Alert
          message={message}
          open={openAlert}
          close={(e) => handleClose(e)}
          type="info"
        />
      </div>
    </div>
  );
};
