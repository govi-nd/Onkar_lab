"use client";

import { useState } from "react";

export type TestOption = {
  id: string;
  title: string;
  price: number;
};

type BookComponentProps = {
  tests: TestOption[];
};

export default function BookComponent({ tests }: BookComponentProps) {
  const [selectedSlot, setSelectedslot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const handleAddTest = (testId: string) => {
    if (!selectedTests.includes(testId)) {
      setSelectedTests([...selectedTests, testId]);
    }
  };

  const removeTest = (testId: string) => {
    setSelectedTests(selectedTests.filter((id) => id !== testId));
  };

  const selectedTestObjects = tests.filter((test) =>
    selectedTests.includes(test.id),
  );

  const total = selectedTestObjects.reduce((sum, test) => sum + test.price, 0);

  return (
    <>
      {/* Header */}
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

        <p className="mt-2 text-gray-500 ">Pay securely</p>
      </div>

      {/* Main Layout */}
      <div className="mt-8 flex justify-center">
        <div className="grid grid-cols-[520px_320px] gap-12 items-start">
          {/* Form */}
          <form
            noValidate
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            {/* Select Test */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Tests
              </label>

              {/* Selected Tags */}
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
                      className="font-bold"
                    ></button>
                  </div>
                ))}
              </div>

              {/* Dropdown */}
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddTest(e.target.value);
                    e.target.value = "";
                  }
                }}
                className="w-full rounded-lg border border-gray-300 p-3"
              >
                <option value="">Choose a test</option>

                {tests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.title} — ₹{test.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="e.g. Govind "
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            {/* Phone + Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="+91 98xxxxxxx"
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>
            </div>

            {/* Date + Slot */}
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
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 ">
                  Time Slot
                </label>

                <select
                  defaultValue=""
                  onChange={(e) => {
                    setSelectedslot(e.target.value);
                  }}
                  className="w-full rounded-lg border border-gray-300 p-3"
                >
                  <option>Select Slot</option>
                  <option>09:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 1:00 PM</option>
                  <option>01:00 PM - 03:00 PM</option>
                  <option>03:00 PM - 05:00 PM</option>
                  <option>05:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Special Notes (optional)
              </label>

              <textarea
                rows={2}
                placeholder="Any allergies, fasting status, or instructions"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Pay ₹{total} via Razorpay
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              By booking, you agree to our terms of service and privacy policy.
            </p>
          </form>

          {/* Summary */}
          <aside className="sticky top-24 h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <span className="text-gray-500">Tests</span>

                <div className="mt-2 space-y-2">
                  {selectedTestObjects.length === 0 ? (
                    <p className="text-gray-400 ">No tests selected</p>
                  ) : (
                    selectedTestObjects.map((test) => (
                      <div
                        key={test.id}
                        className="flex justify-between font-bold"
                      >
                        <span>{test.title}</span>
                        <span>₹{test.price}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{formattedDate || "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Slot</span>
                <span className="font-medium">{selectedSlot}</span>
              </div>

              <hr />

              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>

                <span className="text-2xl font-bold">₹{total}</span>
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
