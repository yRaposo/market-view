import { AccessTokenProvider } from "@/context/AccessContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AccessTokenProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </AccessTokenProvider>
  );
}
