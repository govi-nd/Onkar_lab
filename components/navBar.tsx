"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useState } from "react";
import { signIn } from "next-auth/react";
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
        <LoginDialog />
        <SignUpDialog />
      </div>
    </div>
  );
}
function LoginDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-extrabold text-2xl">
              Welcom back
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Sign in to access your reports and appointments
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="name" placeholder="Govind Prashar" />
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="enter strong password" />
            </Field>
            <Button className="bg-blue-700 hover:bg-blue-500">Sign in</Button>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="text-sm text-gray-500">or continue with</span>

              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            <Button
              type="button"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
              className="text-center"
              variant={"mygreen"}
            >
              Sign in with Google
            </Button>
          </FieldGroup>
          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </form>
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

    const response = await fetch("/signup", {
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
      alert(data.error);
      return;
      setOpen(false);
    }

    alert("User created successfully");
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
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
              className="text-center"
              variant={"mygreen"}
            >
              Sign in with Google
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
