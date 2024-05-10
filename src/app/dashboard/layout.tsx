import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import GenerateButton from "@/components/ui/GenerateButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <GenerateButton />
      <Footer />
    </>
  );
}
