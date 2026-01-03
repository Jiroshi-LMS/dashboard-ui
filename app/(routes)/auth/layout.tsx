import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="fixed top-0 flex justify-between items-center bg-teal-700 lg:bg-transparent w-full px-5 py-4 z-50 shadow-sm lg:shadow-none">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white drop-shadow-sm">
            Jiroshi
          </span>
        </Link>
      </nav>
      {children}
    </>
  );
}