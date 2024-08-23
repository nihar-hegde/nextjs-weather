import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F2F2F2] text-[#5F6368] text-sm fixed bottom-0 z-50 w-full">
      <div className="border-b border-[#DADCE0] px-5 py-2">
        <span>India</span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-5 py-2">
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 mb-2 sm:mb-0">
          <Link href="#" className="hover:underline">
            Advertising
          </Link>
          <Link href="#" className="hover:underline">
            Business
          </Link>
          <Link href="#" className="hover:underline">
            How Search works
          </Link>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-x-6">
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
          <Link href="#" className="hover:underline">
            Terms
          </Link>
          <Link href="#" className="hover:underline">
            Settings
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
