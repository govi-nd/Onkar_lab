export default function () {
  return (
    <div>
      <BookComponent />
    </div>
  );
}
function BookComponent() {
  return (
    <>
      <div className=" mt-4 text-center">
        <div className="mx-auto w-fit flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-600">
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
            className="lucide lucide-calendar-check h-3.5 w-3.5 text-primary"
            aria-hidden="true"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
            <path d="m9 16 2 2 4-4"></path>
          </svg>
          "Book your appointment"
        </div>
        <h1 className="text-3xl font-bold mt-3 text-[oklch(20% .03 250)] ">
          Schedule your test
        </h1>
        <p className="mt-2 test-sm text-[oklch(50% .02 250)]">
          Takes under 2 minutes. Pay securely after confirmation
        </p>
      </div>
      
        <div className="grid grid-cols-[520px_320px] gap-12 justify-center mt-6">
          <form
            noValidate
            className="mx-auto w-full max-w-[520px] rounded-2xl border border-gray-200 bg-white p-6 "
          >
            {/* Select Test */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Select Test
              </label>
              <select className="w-full rounded-lg border border-gray-300 p-3">
                <option>Choose a test</option>
                <option>CBC - ₹500</option>
                <option>Liver Function - ₹1200</option>
                <option>Blood Sugar - ₹300</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Govind Prashar"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98xxxxxxx"
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Date */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Preferred Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Time Slot
                </label>
                <select className="w-full rounded-lg border border-gray-300 p-3">
                  <option>Select Slot</option>
                  <option>09:00 AM</option>
                  <option>11:00 AM</option>
                  <option>01:00 PM</option>
                  <option>03:00 PM</option>
                  <option>05:00 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Special Notes
              </label>
              <textarea
                rows={3}
                placeholder="Any allergies, fasting status, or instructions"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Book Appointment
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              By booking, you agree to our terms of service and privacy policy.
            </p>
          </form>

          <aside className="h-fit  rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Order Summary
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Test</span>
                <span className="font-medium">CBC</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">—</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Slot</span>
                <span className="font-medium">—</span>
              </div>

              <hr />

              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="text-xl font-bold">₹500</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Reports delivered digitally within 24 hours of sample collection.
            </p>
          </aside>
        </div>
     
    </>
  );
}
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 grid gap-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
