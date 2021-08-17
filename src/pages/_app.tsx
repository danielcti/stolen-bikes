import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../../styles/globals.css";
import Header from "../components/Header";
// import "../services/firebase";
import { AuthContextProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Header />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
export default MyApp;
