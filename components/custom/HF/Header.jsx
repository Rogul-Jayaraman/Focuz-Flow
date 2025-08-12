"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import logo from "../../../public/images/FocuzFlowLogo.png";
import logotext from "../../../public/images/FocuzFlowText.png";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { NotepadTextDashed, PenBox } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/checkUser", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Unable to Fetch User");
        }
      } catch (err) {
        console.log("Error while checking the user : ", err.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex justify-between items-center px-2 sm:px-6 py-5 gap-4 border-b-gray-300 border-b-1 shadow">
      <Link href={"/"}>
        <div className="flex">
          <Image
            src={logo}
            alt="Logo"
            height={30}
            className="hidden sm:block"
          />
          <Image src={logotext} alt="FocuzFlow" height={30} />
        </div>
      </Link>
      <div className="flex flex-row gap-1 sm:gap-4 items-center">
        <Link href="/projects?create=true">
          <Button className="bg-orange-600/80">
            <PenBox className="hidden md:block"/>
            <p className="text-[10px] md:text-xs">New Project</p>
          </Button>
        </Link>
        <Link href="/projects">
          <Button className="bg-cyan-950/90">
            <NotepadTextDashed className="hidden md:block"/>
            <p className="text-[10px] md:text-xs">My Projects</p>
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/projects">
            <Button variant="outline">
              <p className="text-[10px] md:text-xs">Login</p>
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
