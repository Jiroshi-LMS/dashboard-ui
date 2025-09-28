import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-primary font-bold text-2xl text-center my-5">JIROSHI HEADLESS LMS</h1>
      <Link href="/auth/signup" className="bg-primary text-white px-5 py-2 rounded border-[1px] border-secondary">Get Started</Link>
    </div>
  );
}
