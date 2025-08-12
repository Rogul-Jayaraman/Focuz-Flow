import { NotoSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/HF/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/custom/HF/Footer";
import CreateNewProject from "@/components/custom/Project/CreateNewProject";
import LoadApiContextProvider from "@/components/context/LoadApiContextProvider";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Focuz Flow",
  description: "Schedule and Manage your tasks",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={notoSans.className}>
          <LoadApiContextProvider>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-orange-100/50 to-white">
              {children}
            </main>
            <Footer />
            <CreateNewProject />
          </LoadApiContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
