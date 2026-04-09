import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Ziyan Nifail | Portfolio",
  description:
    "CS Student, Data Science Instructor & Builder — turning data into decisions and ideas into working software.",
  keywords: ["Ziyan Nifail", "portfolio", "data science", "software engineer", "Malaysia"],
  authors: [{ name: "Ziyan Nifail" }],
  openGraph: {
    title: "Ziyan Nifail | Portfolio",
    description: "CS Student, Data Science Instructor & Builder based in Malaysia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
