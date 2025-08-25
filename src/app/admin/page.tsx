"use client";

import {
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { FoodCategory } from "../_components/admin-components/FoodCategory";
import { FoodCardSection } from "../_components/admin-components/FoodCardSection";
import AdminSidebar from "../_components/admin-components/AdminSideBar";

export default function ProfilePicture() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <SignedIn>
      <div className="flex justify-between">
        <AdminSidebar />
        <div className="pr-10">
          <div className="flex items-center justify-end gap-1 py-6">
            <p className="font-semibold">{user.fullName}</p>
            <UserButton />
          </div>
          <FoodCategory />
          <FoodCardSection />
        </div>
      </div>
    </SignedIn>
  );
}
