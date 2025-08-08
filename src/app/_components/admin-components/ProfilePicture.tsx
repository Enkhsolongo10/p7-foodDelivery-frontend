import {
  useUser,
  useAuth,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function ProfilePicture() {
  const { user } = useUser();
  const { getToken } = useAuth();

  // const sendUserData = async () => {
  //   if (!user) return;

  //   try {
  //     const token = await getToken();

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         userId: user.id,
  //         email: user.primaryEmailAddress?.emailAddress,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log("User saved:", data);
  //   } catch (error) {
  //     console.error("Error sending user data:", error);
  //   }
  // };

  return (
    <div className="relative top-1 left-[48px]">
      <SignedOut>
        <SignInButton>
          <button className="w-[36px] h-[36px]">
            <img
              src="/assets/LogInButton.svg"
              alt="login"
              className="w-full h-full"
            />
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center justify-end gap-2">
          {user && (
            <div className="text-sm">
              <p className="font-semibold">
                {user?.fullName}
              </p>
              {/* <p className="text-gray-500">ID: {user.id}</p> */}
            </div>
          )}
          <UserButton />
          {/* <button
            onClick={sendUserData}
            className="px-3 py-1 bg-blue-500 text-white rounded-md"
          >
            Send to Backend
          </button> */}
        </div>
      </SignedIn>
    </div>
  );
}