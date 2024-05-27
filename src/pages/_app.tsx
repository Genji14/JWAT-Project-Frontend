import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { cn } from "@/lib/utils"
import { FONT_POPPINS } from "@/lib/utils/constants/SettingSystem";
import Header from "@/components/general/Header";
import Providers from "./providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Providers>
        <Header />
        <main className={cn(`flex min-h-screen flex-col items-center justify-between p-24 font-sans`, FONT_POPPINS.className)}>
          <Component {...pageProps} />
        </main>
      </Providers>
    </>
  );
}
