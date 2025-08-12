"use client";
import Image from "next/image";
import LandingPage from "../public/images/LandingPage.png";
import Features from "../components/custom/LandingPage/Features";
import HowItWorks from "../components/custom/LandingPage/HowItWorks";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="container mx-auto px-8 lg:px-6 pt-10 lg:pt-4">
      <div className="flex flex-row justify-around items-center gap-8 mb-20 lg:ml-2">
        <div className="lg:w-1/2">
          <h1 className="tracking-tighter text-5xl sm:text-6xl lg:text-7xl/20 mb-1 gradient-title ">
            Drive Projects Efficiently
          </h1>
          <p className="text-sm sm:text-base font-bold md:text-xl text-gray-600 mb-6 text-justify">
            From daily tasks to big projects, stay in control, focused,
            motivated, and organized at every step. Streamline your work,
            collaborate seamlessly, and get more done, stress free every day.
          </p>
          <div>
                <Link href="/projects">
                  <Button type="default" size="lg" className="text-base">
                    Get Started{" "}
                    <ArrowRight size={50} className="ml-1 font-bold" />
                  </Button>
                </Link>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 p-20">
          <div className="relative aspect-square flex items-center">
            <Image
              src={LandingPage}
              fill
              style={{ objectFit: "cover" }}
              alt="Focuz Flow Landing Page Image"
            />
          </div>
        </div>
      </div>
      <div className="mb-20">
        <Features />
      </div>
      <div className="mb-20">
        <HowItWorks />
      </div>
    </div>
  );
}
