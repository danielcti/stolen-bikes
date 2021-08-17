import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const router = useRouter();
  const { user, signInWithGoogle, signOutWithGoogle } = useAuth();
  return (
    <header className="fixed bg-indigo-50 w-full z-50">
      <div className="max-w-5xl m-auto flex items-center justify-between text-gray-950">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src="/bike_icon.png" height={100} width={100} />
            {/* <h1 className="font-bold text-2xl ml-6">Stolen Bikes Report</h1> */}
          </div>
        </Link>

        <nav className="flex items-center">
          <div
            className={
              router.pathname == "/" ? "font-bold text-xl mx-2" : "text-xl mx-2"
            }
          >
            <Link href="/">List view</Link>
          </div>
          <div
            className={
              router.pathname == "/map"
                ? "font-bold text-xl mx-2"
                : "text-xl mx-2"
            }
          >
            <Link href="/map">Map view</Link>
          </div>
          {!user ? (
            <div
              className="text-xl ml-6 cursor-pointer"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </div>
          ) : (
            <div className="ml-8 flex items-center">
              <Image
                className="rounded-full"
                src={user.avatar}
                height="50"
                width="50"
              />
              <h2 className="text-lg mx-4 font-bold text-gray-700">
                {user.name}
              </h2>

              <h3
                onClick={signOutWithGoogle}
                className="text-lg mx-4 cursor-pointer"
              >
                Sign out
              </h3>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
