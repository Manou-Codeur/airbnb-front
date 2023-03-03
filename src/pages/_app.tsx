import type { AppProps } from "next/app";
import "../styles/globals.scss";
// Components
import { AuthProvider } from "contexts/auth.context";
import { ThemeProvider } from "next-themes";
import { FilterProvider } from "contexts/filter.context";
import { AlertProvider } from "contexts/alert.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AlertProvider>
        <AuthProvider>
          <FilterProvider>
            <Component {...pageProps} />
          </FilterProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}
