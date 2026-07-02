"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { detailsSchema, Details, Errors } from "./types";
import { useCartStore } from "@/store/useCartStore";

const SLOTS = [
  { time: "7:00 AM", label: "Early morning" },
  { time: "9:00 AM", label: "Morning" },
  { time: "11:00 AM", label: "Late morning" },
  { time: "2:00 PM", label: "Afternoon" },
  { time: "4:00 PM", label: "Late afternoon" },
  { time: "6:00 PM", label: "Evening" },
] as const;

export default function PatientDetails() {
  const router = useRouter();
  const { cart, patientDetails, setPatientDetails } = useCartStore();
  
  const [localDetails, setLocalDetails] = useState<Details>(patientDetails);
  const [errors, setErrors] = useState<Errors>({});

  // Redirect if no tests selected
  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/book/select-tests");
    }
  }, [cart, router]);

  const todayDateString = new Date().toISOString().split("T")[0];

  const handleInputChange = (field: keyof Details, value: string) => {
    setLocalDetails((prev) => ({ ...prev, [field]: value }));
    // Clear error for the field being edited
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleContinue = () => {
    const validationResult = detailsSchema.safeParse(localDetails);

    if (validationResult.success === false) {
      const parsedErrors: Errors = {};
      for (const issue of validationResult.error.issues) {
        const field = issue.path[0] as keyof Details;
        parsedErrors[field] = issue.message;
      }
      setErrors(parsedErrors);
    } else {
      setPatientDetails(localDetails);
      router.push("/book/review");
    }
  };

  const handleBack = () => {
    router.push("/book/select-tests");
  };

  if (cart.length === 0) return null; // Prevent flicker before redirect

  return (
    <section className="mx-auto max-w-4xl sm:px-6 sm:py-14">
      <div className="flex items-center justify-between gap-3 mt-2 mb-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={handleContinue}
          className="gap-1"
        >
          Continue <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-foreground">Pick a slot & your details</h2>
        <p className="text-sm text-muted-foreground">Our phlebotomist will call to confirm.</p>

        <div className="mt-6">
          <Label className="text-sm font-medium text-foreground">Preferred date</Label>
          <Input
            type="date"
            min={todayDateString}
            value={localDetails.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className={cn("mt-1.5 h-11", errors.date && "border-destructive")}
          />
          {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
        </div>

        <div className="mt-5">
          <Label className="text-sm font-medium text-foreground">Time slot</Label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SLOTS.map((s) => {
              const on = localDetails.slot === s.time;
              return (
                <button
                  key={s.time}
                  type="button"
                  onClick={() => handleInputChange("slot", s.time)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-all",
                    on
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border bg-background hover:border-primary/40",
                  )}
                >
                  <div className="text-sm font-semibold text-foreground">{s.time}</div>
                  <div className="text-[11px] text-muted-foreground">{s.label}</div>
                </button>
              );
            })}
          </div>
          {errors.slot && <p className="mt-1 text-xs text-destructive">{errors.slot}</p>}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-sm font-medium">Full name</Label>
            <Input
              value={localDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Aarav Sharma"
              className={cn("mt-1.5", errors.name && "border-destructive")}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <Label className="text-sm font-medium">Phone</Label>
            <Input
              type="tel"
              value={localDetails.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+91 98xxxxxxx"
              className={cn("mt-1.5", errors.phone && "border-destructive")}
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input
              type="email"
              value={localDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="you@example.com"
              className={cn("mt-1.5", errors.email && "border-destructive")}
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label className="text-sm font-medium">Notes (optional)</Label>
            <Textarea
              value={localDetails.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Fasting status, allergies, address for home collection…"
              rows={3}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
