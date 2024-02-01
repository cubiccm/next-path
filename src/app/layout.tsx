import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PATH Next Train",
  description: "PATH train real-time status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
