import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuDot } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="padding bg-bgtop text-muted bottom-0">
      <div className="flex items-center justify-between max-lg:justify-center max-lg:flex-col">
        <div className="flex flex-col max-lg:items-center items-start justify-center text-sm">
          <span className="w-full flex items-center justify-start max-lg:justify-center">
            <Link href="/" className="w-36 font-bold text-xl ">
              <Image
                src="/logoo.svg"
                alt="logo"
                width={1200}
                height={1200}
                className="w-full h-auto mb-4"
              />
            </Link>
          </span>
          <p>
            &copy; {new Date().getFullYear()} Otaku.tv. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-end w-[60%] max-lg:w-full">
          <p className="text-xs text-center lg:text-end max-lg:mt-4">
            Otaku.tv is a personal project aimed at anime enthusiasts. This
            website is not affiliated with any official anime streaming services
            and is not intended for piracy or illegal activities. It’s purely
            for learning and personal development.
          </p>
          <ul className=" mt-3 text-sm flex items-center justify-center gap-x-4 text-center max-md:grid max-md:grid-cols-3 place-items-center ">
            <li>
              <Link
                href="https://arnab-here.vercel.app/"
                className="hover:text-[#ff0000] transition-colors"
                target='_blank'
              >
                About
              </Link>
            </li>
            <LuDot color="red" size={24} />
            <li>
              <Link
                href="/Terms"
                className="hover:text-[#ff0000] transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <LuDot color="red" size={24} className="max-md:hidden" />
            <li>
              <Link
                href="/PrivacyPolicy"
                className="hover:text-[#ff0000] transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <LuDot color="red" size={24} />
            <li>
              <Link
                href="/FAQs"
                className="hover:text-[#ff0000] transition-colors"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
