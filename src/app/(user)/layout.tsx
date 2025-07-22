import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {" "}
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
