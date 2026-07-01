"use client";

import { useCart } from "@/components/cartContext";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PACKAGES } from "@/lib/packages-data";
import { toast } from "sonner";

export type TestOption = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  category?: string;
};

type BookComponentProps = {
  tests: TestOption[];
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const mIdx = parseInt(month, 10) - 1;
    if (mIdx >= 0 && mIdx < 12) {
      return `${parseInt(day, 10)} ${months[mIdx]} ${year}`;
    }
  }
  return dateString;
};

export default function BookComponent({ tests }: BookComponentProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [selectedSlot, setSelectedslot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const searchParams = useSearchParams();
  const testParam = searchParams ? searchParams.get("test") : null;

  const allAvailableItems = [
    ...tests,
    ...PACKAGES.map(p => ({
      id: p.id,
      title: p.name,
      subtitle: p.tagline,
      price: p.price,
      category: "Package"
    }))
  ];

  const formattedDate = formatDate(selectedDate);

  const handleAddTest = (testId: string) => {
    const item = allAvailableItems.find((t) => t.id === testId);
    const alreadyInCart = cart.some((c) => c.id === testId);

    if (item && !alreadyInCart) {
      addToCart({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle ?? "",
        price: item.price,
        category: item.category ?? "",
      });
    }
  };

  useEffect(() => {
    if (testParam) {
      handleAddTest(testParam);
    }
  }, [testParam]);

  const removeTest = (testId: string) => {
    removeFromCart(testId);
  };

  const selectedTestObjects = allAvailableItems.filter((item) =>
    cart.some((cartItem) => cartItem.id === item.id),
  );

  const total = selectedTestObjects.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="mt-4 text-center">
        <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="oklch(49.4% .131 250)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="m9 16 2 2 4-4" />
          </svg>
          Book your appointment
        </div>

        <h1 className="mt-3 text-4xl font-bold text-gray-900">
          Schedule your test
        </h1>

        <p className="mt-2 text-gray-500">Pay securely</p>
      </div>

      <div className="mt-8 flex justify-center px-4 md:px-0 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[520px_320px] items-start gap-6 lg:gap-12 w-full max-w-4xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (cart.length === 0) {
                toast.error("Please add at least one test or package to book.");
                return;
              }
              if (!fullName.trim()) {
                toast.error("Please enter your full name.");
                return;
              }
              if (!phoneNumber.trim()) {
                toast.error("Please enter your phone number.");
                return;
              }
              if (!email.trim()) {
                toast.error("Please enter your email address.");
                return;
              }
              if (!selectedDate) {
                toast.error("Please select your preferred date.");
                return;
              }
              if (!selectedSlot) {
                toast.error("Please select a time slot.");
                return;
              }

              toast.success(`Booking successfully scheduled for ${fullName}! Order Total: ₹${total}`);
              
              // Reset state
              setFullName("");
              setPhoneNumber("");
              setEmail("");
              setNotes("");
              setSelectedDate("");
              setSelectedslot("");
              cart.forEach(item => removeFromCart(item.id));
            }}
            noValidate
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Tests & Packages
              </label>

              <div className="mb-3 flex flex-wrap gap-2">
                {selectedTestObjects.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                  >
                    <span>{test.title}</span>

                    <button
                      type="button"
                      onClick={() => removeTest(test.id)}
                      className="cursor-pointer font-medium"
                      aria-label={`Remove ${test.title}`}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>

              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddTest(e.target.value);
                  }
                }}
                className="w-full rounded-lg border border-gray-300 p-3"
              >
                <option value="">Choose a test or package</option>
                <optgroup label="Health Packages">
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - Rs. {pkg.price}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Individual Tests">
                  {tests.map((test) => (
                    <option key={test.id} value={test.id}>
                      {test.title} - Rs. {test.price}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="e.g. Govind"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="+91 98xxxxxxx"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3"
                  required
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Preferred Date
                </label>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Time Slot
                </label>

                <select
                  value={selectedSlot}
                  onChange={(e) => {
                    setSelectedslot(e.target.value);
                  }}
                  className="w-full rounded-lg border border-gray-300 p-3"
                  required
                >
                  <option value="">Select Slot</option>
                  <option>09:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 1:00 PM</option>
                  <option>01:00 PM - 03:00 PM</option>
                  <option>03:00 PM - 05:00 PM</option>
                  <option>05:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Special Notes (optional)
              </label>

              <textarea
                rows={2}
                placeholder="Any allergies, fasting status, or instructions"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Pay Rs. {total} via Razorpay
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              By booking, you agree to our terms of service and privacy policy.
            </p>
          </form>

          <aside className="sticky top-24 h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <span className="text-gray-500">Tests</span>

                <div className="mt-2 space-y-2">
                  {selectedTestObjects.length === 0 ? (
                    <p className="text-gray-400">No tests selected</p>
                  ) : (
                    selectedTestObjects.map((test) => (
                      <div
                        key={test.id}
                        className="flex justify-between font-bold"
                      >
                        <span>{test.title}</span>
                        <span>Rs. {test.price}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{formattedDate || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Slot</span>
                <span className="font-medium">{selectedSlot || "-"}</span>
              </div>

              <hr />

              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>

                <span className="text-2xl font-bold">Rs. {total}</span>
              </div>
            </div>

            <p className="mt-5 text-xs text-gray-500">
              Reports delivered digitally within 24 hours of sample collection.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
