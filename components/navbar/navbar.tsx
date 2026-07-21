"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Suspense, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import { User, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "../logo";
import LoginDialog from "./loginDialog";
import SignUpDialog from "./signup";

// ------------------------------------------------------------------
// Static nav link data — single source of truth used for both the
// desktop links row and the mobile Sheet menu.
// ------------------------------------------------------------------
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tests", label: "Tests" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

// ------------------------------------------------------------------
// NavBar Component
// Top-level sticky navigation bar used across all pages of Onkar Labs.
// Handles: branding/logo, nav links, auth state (login/logout),
// cart icon with item count, and a mobile menu via shadcn Sheet.
// ------------------------------------------------------------------
export default function NavBar() {
  const pathname = usePathname();
  const { cart } = useCartStore();

  // `data` (session) is needed now to read the logged-in user's name
  const { data: session, status } = useSession();

  // Controls the Sheet's open/closed state (shadcn Sheet is a controlled component)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Shared className builder for nav links — highlights the active route
  const linkClass = (href: string, extra = "") =>
    `${pathname === href ? "text-blue-600 font-bold" : "text-gray-600"} hover:text-[#0d6efd] hover:translate-y-1 transition duration-300 ${extra}`;

  // Falls back to "Profile" if the user has no name on their session (e.g. email-only signup)
  const displayName = session?.user?.name || "Profile";

  // Shared auth block — renders differently based on session status.
  // Reused for both desktop and mobile so the 3-state logic lives in one place.
  function AuthSection({ mobile = false }: { mobile?: boolean }) {
    if (status === "loading") {
      return (
        <div
          className={`animate-pulse bg-gray-200 rounded-md ${mobile ? "w-full h-10" : "w-20 h-10"}`}
        ></div>
      );
    }

    if (status === "authenticated") {
      // Mobile: simple stacked links. Desktop: dropdown menu.
      if (mobile) {
        return (
          <>
            <p className="text-lg font-medium text-gray-800">{displayName}</p>
            <Link
              href="/report"
              className="block text-lg font-medium text-gray-600"
              onClick={closeMobileMenu}
            >
              Reports
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                signOut();
                closeMobileMenu();
              }}
            >
              Logout
            </Button>
          </>
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Shows the logged-in user's name instead of a generic "Profile" label */}
            <Button variant="outline" className="gap-2 max-w-40 truncate">
              <User className="h-4 w-4 shrink-0" />
              <span className="truncate">{displayName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/report">Reports</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    // Unauthenticated: Login + Sign Up
    return (
      <div className={mobile ? "flex flex-col gap-2" : "flex items-center gap-2"}>
        <Suspense fallback={<Button variant="outline" className={mobile ? "w-full" : ""}>Login</Button>}>
          <LoginDialog />
        </Suspense>
        <SignUpDialog />
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm w-full ">
      <div className="h-18 w-full flex items-center px-4 md:px-8 justify-between md:justify-around">

        {/* ---------------- Logo Section ---------------- */}
        <div className="flex items-center gap-2 h-full py-2">
          <Link href="/" className="flex flex-row gap-2 items-center h-full" onClick={closeMobileMenu}>
            <Logo className="h-full w-auto transition-all object-contain" />
          </Link>
        </div>

        {/* ---------------- Desktop Nav Links ----------------
            Hidden on mobile. Rendered from the shared navLinks array. */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* ---------------- Right Side: Auth + Cart + Mobile Toggle ---------------- */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Desktop auth — hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <AuthSection />
          </div>

          {/* Cart Icon + Mobile Menu Trigger */}
          <div className="ml-2 flex items-center">
            <Link href="/book" className="relative inline-block" onClick={closeMobileMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>

              {/* Badge only shows when cart actually has items */}
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-800 text-xs text-white">
                  {cart.length}
                </div>
              )}
            </Link>

            {/* ---------------- Mobile Menu (shadcn Sheet) ----------------
                Replaces the old custom absolute-positioned overlay panel.
                Sheet handles its own open/close animation, backdrop, and
                outside-click / Escape-to-close behavior out of the box. */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="ml-4 md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72 flex flex-col gap-4 pt-10">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className={linkClass(link.href, "block")}>
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col gap-3">
                  <AuthSection mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}