import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}

      <Footer />
    </>
  );
}
