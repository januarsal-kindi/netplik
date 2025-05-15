import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // fetcher,
        onError: (err) => {
          console.error("SWR error:", err);
        },
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <Component {...pageProps} />;
    </SWRConfig>
  );
}
