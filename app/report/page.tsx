"use client";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";

type Booking = {
  id: string;
  createdAt: string;
  report: {
    id: string;
    fileUrl: string;
    fileName: string;
    status: "PENDING" | "UPLOADED";
    uploadedAt: string | null;
  } | null;
  tests: {
    test: {
      id: string;
      title: string;
      category: string;
    };
  }[];
};

export default function Report() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/reports");

        if (res.status === 401) {
          window.location.href = "/?login=true";
          toast.warning("First Login");
          return;
        }

        if (!res.ok) {
          throw new Error("please login");
        }

        const data = await res.json();

        // because API returns user object
        setBookings(data.bookings || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.id.toLowerCase().includes(search.toLowerCase()) ||
        booking.tests.some((t) =>
          t.test.title.toLowerCase().includes(search.toLowerCase())
        );

      const reportStatus = booking.report?.status ?? "PENDING";

      const matchesStatus =
        status === "all" ||
        (status === "ready" && reportStatus === "UPLOADED") ||
        (status === "processing" && reportStatus === "PENDING");

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, status]);

  const totalReports = bookings.length;
  const readyReports = bookings.filter(
    (b) => b.report?.status === "UPLOADED"
  ).length;
  const processingReports = bookings.filter(
    (b) => !b.report || b.report.status === "PENDING"
  ).length;

  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              📄
            </div>

            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                My Reports
              </h1>

              <p className="text-muted-foreground">
                Access, preview and download your reports securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">
              Total Reports
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalReports}
            </h2>
          </div>

          <div className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">
              Ready to Download
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {readyReports}
            </h2>
          </div>

          <div className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">
              Processing
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {processingReports}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 rounded-xl border p-6">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <h2 className="text-xl font-semibold">
              Your Reports
            </h2>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Test or ID"
                className="rounded-md border px-4 py-2"
              />

              <Select
                value={status}
                onValueChange={setStatus}
              >
                <SelectTrigger className="w-55">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>

                    <SelectItem value="all">
                      All Reports
                    </SelectItem>

                    <SelectItem value="ready">
                      Ready
                    </SelectItem>

                    <SelectItem value="processing">
                      Processing
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Report Cards */}
          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="text-center py-10">
                Loading...
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No reports found.
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Left */}
                    <div className="flex gap-4">
                      <div className="rounded-md bg-secondary p-3">
                        📄
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {booking.tests
                            .map((t) => t.test.title)
                            .join(", ")}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Booking ID: {booking.id}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span>
                            Booked{" "}
                            {new Date(
                              booking.createdAt
                            ).toLocaleDateString()}
                          </span>

                          {booking.report?.uploadedAt && (
                            <span>
                              Uploaded{" "}
                              {new Date(
                                booking.report.uploadedAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-3 py-1 text-xs font-medium ${
                          booking.report?.status === "UPLOADED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.report?.status === "UPLOADED"
                          ? "Ready"
                          : "Processing"}
                      </span>

                      {booking.report?.fileUrl && (
                        <>
                          <a
                            href={booking.report.fileUrl}
                            target="_blank"
                            className="rounded-md border px-3 py-2 text-sm"
                          >
                            Preview
                          </a>

                          <a
                            href={booking.report.fileUrl}
                            download
                            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                          >
                            Download
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}