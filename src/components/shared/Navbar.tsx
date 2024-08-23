import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 w-full text-[#5F6368] fixed z-50">
      <div className="flex items-center gap-4">
        <Link href={"/"} className="hover:underline">
          About
        </Link>
        <Link href={"/"} className="hover:underline">
          Store
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href={"/"} className="hover:underline">
          Gmail
        </Link>
        <Link href={"/"} className="hover:underline">
          Images
        </Link>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
