"use client";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Suspense, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCart } from "@/components/cartContext";
import { Activity, User, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./logo";
export default function NavBar() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="relative z-50 bg-white">
      <div className="h-16 w-full border-b border-gray-200 flex items-center px-4 md:px-8 justify-between md:justify-around">
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex flex-row gap-2 items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo className="h-20 w-auto" />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
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
            href="/packages"
            className={` 
      ${pathname === "/packages" ? "text-blue-600 font-bold" : "text-gray-600"}
      hover:text-[#0d6efd]
      hover:translate-y-1
      transition
      duration-300
    `}
          >
            Packages
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

        {/* Auth Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-2">
            {status === "loading" ? (
              <div className="w-20 h-10 animate-pulse bg-gray-200 rounded-md"></div>
            ) : status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    Profile
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
            ) : (
              <>
                <Suspense fallback={<Button variant="outline">Login</Button>}>
                  <LoginDialog />
                </Suspense>
                <SignUpDialog />
              </>
            )}
          </div>
          
          <div className="ml-2 flex items-center">
            <Link href="/book" className="relative inline-block" onClick={() => setIsMobileMenuOpen(false)}>
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

              <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-800 text-xs text-white">
                {cart.length}
              </div>
            </Link>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              className="ml-4 md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg px-4 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className={`block text-lg font-medium ${pathname === "/" ? "text-blue-600 font-bold" : "text-gray-600"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/tests"
            className={`block text-lg font-medium ${pathname === "/tests" ? "text-blue-600 font-bold" : "text-gray-600"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tests
          </Link>
          <Link
            href="/packages"
            className={`block text-lg font-medium ${pathname === "/packages" ? "text-blue-600 font-bold" : "text-gray-600"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Packages
          </Link>
          <Link
            href="/contact"
            className={`block text-lg font-medium ${pathname === "/contact" ? "text-blue-600 font-bold" : "text-gray-600"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          
          <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col gap-3">
            {status === "loading" ? (
              <div className="w-full h-10 animate-pulse bg-gray-200 rounded-md"></div>
            ) : status === "authenticated" ? (
              <>
                <Link href="/report" className="block text-lg font-medium text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>Reports</Link>
                <Button variant="outline" className="w-full justify-start" onClick={() => { signOut(); setIsMobileMenuOpen(false); }}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Suspense fallback={<Button variant="outline" className="w-full">Login</Button>}>
                  <LoginDialog />
                </Suspense>
                <SignUpDialog />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LoginDialog() {
  const searchParams = useSearchParams();
  const currentUrl = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("login") === "true") {
      setOpen(true);
    }
  }, [searchParams]);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");

      return;
    }

    router.refresh();
    router.push(currentUrl);
    setOpen(false);
    toast.success("You Sign in successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleLogin}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold">
              Welcome back
            </DialogTitle>

            <DialogDescription className="text-muted-foreground">
              Sign in to access your reports and appointments
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-6 space-y-4">
            <Field>
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="govind@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300" />

              <span className="text-sm text-gray-500">or continue with</span>

              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full justify-center gap-2 hover:bg-blue-50/50 hover:text-blue-600 hover:border-blue-300 transition duration-300"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
            >
              Sign in with Google
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SignUpDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function createUser(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error);
      return;
      setOpen(false);
    }

    toast.success("User created successfully");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign up</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={createUser}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold">
              Welcome
            </DialogTitle>
            <DialogDescription>Sign up to continue</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Field>

            <Field>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field>
              <Label>Phone</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Field>

            <Field>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            <Button type="submit" className="bg-blue-700 hover:bg-blue-500">
              Sign Up
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="text-sm text-gray-500">or continue with</span>

              <div className="h-px flex-1 bg-gray-300"></div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-center gap-2 hover:bg-blue-50/50 hover:text-blue-600 hover:border-blue-300 transition duration-300"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
            >
              Sign in with Google
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
