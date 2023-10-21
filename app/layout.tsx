import { Inter, Tomorrow } from "next/font/google";
import { App } from "./app";
import "./globals.css";

export const inter = Inter({ subsets: ["latin"] });
export const tomorrow = Tomorrow({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-tomorrow",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AWEI</title>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={[tomorrow.className].join(" ")}>
        <App>{children}</App>
      </body>
    </html>
  );
}
