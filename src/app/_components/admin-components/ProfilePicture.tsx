"use client";

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function ProfilePicture() {
  const { user } = useUser();

  if (!user) return null; // сервер render дээр user байхгүй бол ямар ч HTML үүсгэхгүй

  return (
    <SignedIn>
      <div className="flex items-center justify-end gap-2">
        <div className="text-sm">
          <p className="font-semibold">{user.fullName}</p>
        </div>
        <UserButton />
      </div>
    </SignedIn>
  );
}
