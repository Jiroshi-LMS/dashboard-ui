import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="fixed top-0 flex justify-between items-center bg-transparent w-screen px-5 py-2">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Jiroshi
          </span>
        </Link>
      </nav>
      {children}
    </>
  );
}