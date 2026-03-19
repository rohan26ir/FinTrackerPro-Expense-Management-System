// app/(public)/layout.tsx
import Navbar from "../components/shared/navbar";
import Footer from "../components/shared/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header><Navbar /></header>
      <main>{children}</main>
      <footer><Footer /></footer>
    </>
  );
}