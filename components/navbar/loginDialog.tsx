import { signIn } from "next-auth/react";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
import {  Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog , DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FieldGroup, Field } from "../ui/field";
import { Input } from "../ui/input";

 export default function LoginDialog() {
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