"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="h-16 w-full border-b border-gray-200 flex items-center px-8 justify-around">
      {/* Logo + Name */}
      <div className="flex items-center gap-1">
        <div className="h-16 w-8  flex items-center justify-center gap-2">
          <svg
            viewBox="0 0 60 72"
            width="42"
            height="88"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30,4 C30,4 6,30 6,46 C6,59 17,68 30,68 C43,68 54,59 54,46 C54,30 30,4 30,4 Z"
              fill="#0d6efd"
            />
            <rect x="25" y="28" width="10" height="28" rx="2" fill="#ffffff" />
            <rect x="16" y="37" width="28" height="10" rx="2" fill="#ffffff" />
          </svg>
        </div>
        <span className="text-3xl font-bold text-[#0d2b45]">Onkar Labs</span>
      </div>

      {/* /* Nav Links */}
      <div className="flex items-center gap-8 text-lg font-medium ">
        <Link
          href="/"
          className={` 
    ${pathname === "/" ? "text-blue-600 font-bold" : "text-gray-600"}
    hover:text-[#0d6efd]
    hover:translate-y-1
    transition
    duration-300
  `}
        >
          Home
        </Link>
        <Link

          href="/tests"
          className={` 
    ${pathname === "/tests" ? "text-blue-600 font-bold" : "text-gray-600"}
    hover:text-[#0d6efd]
    hover:translate-y-1
    transition
    duration-300
  `}
        >
          Tests
        </Link>
        <Link
          href="/book"
          className={` 
    ${pathname === "/book" ? "text-blue-600 font-bold" : "text-gray-600"}
    hover:text-[#0d6efd]
    hover:translate-y-1
    transition
    duration-300
  `}
        >
          Book Appointment
        </Link>
        <Link

          href="/contact"
          className={` 
    ${pathname === "/contact" ? "text-blue-600 font-bold" : "text-gray-600"}
    hover:text-[#0d6efd]
    hover:translate-y-1
    transition
    duration-300
  `}
        >
          Contact
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="border border-gray-300 text-base px-5 py-1.5 rounded-full hover:bg-[#447324] hover:text-white hover:translate-y-1 transition duration-500 "
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="border border-gray-300 text-base px-5 py-1.5 rounded-full hover:bg-[#447324] hover:text-white hover:translate-y-1 transition duration-500 "
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
