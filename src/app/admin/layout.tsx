import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <SignedOut>
        <SignInButton>
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/assets/logo.svg"
                alt="logo"
                width={100}
                height={100}
              />
              <h1 className="text-3xl font-semibold text-gray-800">
                Welcome to Food Admin
              </h1>
              <button className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Log in as an Admin
              </button>
            </div>
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="bg-stone-100">{children}</div>
      </SignedIn>
    </ClerkProvider>
  );
}