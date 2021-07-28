import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <h1 className="text-4xl">404 - Not Found</h1>
      <Link href="/">
        <a className="mt-6 text-blue-600">Back to homepage</a>
      </Link>
    </div>
  );
}
