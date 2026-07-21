import { signIn } from "next-auth/react";
import {  Label } from "@/components/ui/label";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {Dialog , DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FieldGroup, Field } from "../ui/field";
import { Input } from "../ui/input";

 export default function SignUpDialog() {
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