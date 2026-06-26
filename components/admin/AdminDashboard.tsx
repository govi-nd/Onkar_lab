"use client";
import { toast } from "sonner";
import type React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Users,
  CalendarDays,
  FileClock,
  CheckCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
import { Badge } from "@/components/ui/badge";


// ---------- Types (mirroring schema.prisma) ----------
type Test = { id: string; title: string; subtitle: string; price: number };
type BookingTest = { test: Test };
type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";
type Payment = {
  id: string;
  amount: number;
  status: PaymentStatus;
};
type Report = {
  id: string;
  fileUrl: string;
  fileName: string;
  remarks?: string | null;
  status: "PENDING" | "UPLOADED";
};
type BookingStatus =
  | "PENDING_PAYMENT"
  | "BOOKED"
  | "SAMPLE_COLLECTED"
  | "PROCESSING"
  | "REPORT_READY"
  | "COMPLETED"
  | "CANCELLED";
type Booking = {
  id: string;
  appointmentDate: string;
  slot: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  tests: BookingTest[];
  payment: Payment | null;
  report: Report | null;
};
type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "USER" | "ADMIN";
  bookings: Booking[];
};

const BOOKING_STATUSES: BookingStatus[] = [
  "BOOKED",
  "SAMPLE_COLLECTED",
  "REPORT_READY",
  "COMPLETED",
  "CANCELLED",
];

const bookingStatusLabels: Record<BookingStatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  BOOKED: "Booked",
  SAMPLE_COLLECTED: "Sample Collected",
  PROCESSING: "Processing",
  REPORT_READY: "Report Ready",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function bookingStatusVariant(status: BookingStatus) {
  if (status === "CANCELLED") return "destructive";
  if (status === "COMPLETED" || status === "REPORT_READY") return "default";
  if (status === "PENDING_PAYMENT") return "secondary";
  return "outline";
}

function getPaymentStatus(booking: Booking): PaymentStatus {
  return booking.payment?.status ?? booking.paymentStatus;
}

function paymentStatusVariant(status: PaymentStatus) {
  if (status === "SUCCESS") return "default";
  if (status === "FAILED") return "destructive";
  return "secondary";
}

const ADMIN_DIALOG_CLASS = "w-[min(96vw,980px)] sm:max-w-none";

// ---------- Main dashboard ----------
export default function AdminDashboard() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");


  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (res.ok) {
        setUsers(data);
      } else {
        setError(data?.message || "Failed to load bookings");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchUsers);
  }, [fetchUsers]);

  // Flatten all bookings across all users, newest first, for the table.
  const allBookings = users
    .flatMap((u) =>
      u.bookings.map((b) => ({ ...b, patientName: u.name, patientId: u.id }))
    )
    .filter((booking) => getPaymentStatus(booking) === "SUCCESS")
    .sort(
      (a, b) =>
        new Date(b.appointmentDate).getTime() -
        new Date(a.appointmentDate).getTime()
    );

  // ---- Derived stats (these were referenced in JSX but never defined) ----
  const totalPatients = users.filter((u) => u.role === "USER").length;

  const pendingReports = allBookings.filter(
    (b) => b.report?.status !== "UPLOADED"
  ).length;

  const completedBookings = allBookings.filter(
    (b) => b.bookingStatus === "COMPLETED"
  ).length;

  // ---- Search filter for the bookings table (search state existed, but was never applied) ----
  const filteredBookings = allBookings.filter((booking) =>
    booking.patientName.toLowerCase().includes(search.toLowerCase())
  );

 return (
  <div className="mt-16 px-8 space-y-6">
    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm">Patients</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">{totalPatients}</div>
          <p className="text-xs text-muted-foreground">
            Registered patients
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm">Bookings</CardTitle>
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">{allBookings.length}</div>
          <p className="text-xs text-muted-foreground">
            Total appointments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm">Pending Reports</CardTitle>
          <FileClock className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">{pendingReports}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting upload
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm">Completed</CardTitle>
          <CheckCircle className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">{completedBookings}</div>
          <p className="text-xs text-muted-foreground">
            Finished bookings
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Main Section */}
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded-lg border w-full lg:w-[65%]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Recent Bookings
            </h1>

            <p className="text-muted-foreground">
              Review patient appointments
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={fetchUsers}
          >
            Refresh
          </Button>
        </div>

        <Input
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6"
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Tests</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Report</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-red-500"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.patientName}</TableCell>

                  <TableCell>
                    {booking.tests
                      .map((t) => t.test.title)
                      .join(", ")}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      booking.appointmentDate
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={bookingStatusVariant(
                        booking.bookingStatus
                      )}
                    >
                      {
                        bookingStatusLabels[
                          booking.bookingStatus
                        ]
                      }
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={paymentStatusVariant(
                        getPaymentStatus(booking)
                      )}
                    >
                      {getPaymentStatus(booking)}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {booking.report?.status === "UPLOADED" ? (
                      <a
                        href={booking.report.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      <Badge variant="outline">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Quick Actions */}
      <div className="border rounded-lg p-6 w-full lg:w-[35%] bg-white h-fit">
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="text-muted-foreground text-sm mb-4">
          Common admin tasks
        </p>

        <div className="flex flex-col gap-4">
          <TestDialogBox />

          <ManageBookingsDialog
            bookings={allBookings}
            onUpdated={fetchUsers}
          />

          <ViewPatientsDialog users={users} />

          <ReportDialogBox
            users={users}
            onUploaded={fetchUsers}
          />
        </div>
      </div>
    </div>
  </div>
);
}

// ---------- Add Test ----------
function TestDialogBox() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  async function createTest(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subtitle,
          category,
          price,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.message || "Error creating test");
        return;
      }

      toast.success("Test added");
      setTitle("");
      setSubtitle("");
      setCategory("");
      setPrice(0);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while creating the test");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Test</Button>
      </DialogTrigger>

      <DialogContent className={ADMIN_DIALOG_CLASS}>
        <form onSubmit={createTest}>
          <DialogHeader>
            <DialogTitle>Add Test</DialogTitle>

            <DialogDescription>Create a new laboratory test.</DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-5">
            <Field>
              <Label>Title</Label>
              <Input
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>

            <Field>
              <Label>Subtitle (must be unique)</Label>
              <Input
                value={subtitle}
                required
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Field>

            <Field>
              <Label>Category</Label>
              <Input
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </Field>

            <Field>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                value={price}
                required
                min={0}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Field>

            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ---------- Manage Bookings ----------
type FlatBooking = Booking & { patientName: string; patientId: string };

function ManageBookingsDialog({
  bookings,
  onUpdated,
}: {
  bookings: FlatBooking[];
  onUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateBookingStatus(bookingId: string, status: BookingStatus) {
    setUpdatingId(bookingId);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/booking-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.message || "Could not update booking status");
        return;
      }

      onUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating booking status");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Bookings</Button>
      </DialogTrigger>

      <DialogContent className={ADMIN_DIALOG_CLASS}>
        <DialogHeader>
          <DialogTitle>Manage Bookings</DialogTitle>
          <DialogDescription>
            Update booking status for paid patient appointments.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Booking Status</TableHead>
                <TableHead>Payment Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.patientName}</TableCell>
                    <TableCell>
                      {new Date(booking.appointmentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>₹{booking.totalAmount}</TableCell>
                    <TableCell>
                      <Select
                        value={booking.bookingStatus}
                        disabled={updatingId === booking.id}
                        onValueChange={(value) =>
                          updateBookingStatus(booking.id, value as BookingStatus)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {BOOKING_STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                              {bookingStatusLabels[status]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{getPaymentStatus(booking)}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No bookings to manage
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------- View Patients ----------
function ViewPatientsDialog({ users }: { users: User[] }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  const patients = users.filter((u) => u.role === "USER");

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setSelected(null);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">View Patients</Button>
      </DialogTrigger>

      <DialogContent className={ADMIN_DIALOG_CLASS}>
        <DialogHeader>
          <DialogTitle>{selected ? selected.name : "Patients"}</DialogTitle>
          <DialogDescription>
            {selected
              ? "Booking history for this patient."
              : "Search and view registered patients."}
          </DialogDescription>
        </DialogHeader>

        {selected ? (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-3"
              onClick={() => setSelected(null)}
            >
              ← Back to list
            </Button>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tests</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Report</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selected.bookings.length > 0 ? (
                  selected.bookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell>
                        {b.tests.map((t) => t.test.title).join(", ")}
                      </TableCell>
                      <TableCell>
                        {new Date(b.appointmentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={bookingStatusVariant(b.bookingStatus)}>
                          {bookingStatusLabels[b.bookingStatus]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getPaymentStatus(b)}</Badge>
                      </TableCell>
                      <TableCell>
                        {b.report?.status === "UPLOADED" ? (
                          <a
                            href={b.report.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Not uploaded
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No bookings for this patient
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div>
            <Input
              placeholder="Search patients by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3"
            />

            <div className="max-h-[50vh] overflow-y-auto">
              {filtered.length > 0 ? (
                <Table>
                  <TableBody>
                    {filtered.map((p) => (
                      <TableRow
                        key={p.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelected(p)}
                      >
                        <TableCell>{p.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.email}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {p.bookings.length} booking
                          {p.bookings.length !== 1 ? "s" : ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-6">
                  No patients found
                </p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ---------- Upload Report ----------
function ReportDialogBox({
  users,
  onUploaded,
}: {
  users: User[];
  onUploaded: () => void;
}) {
  const [open, setOpen] = useState(false);

  const [patientId, setPatientId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const patients = users.filter((u) => u.role === "USER");
  const selectedPatient = patients.find((p) => p.id === patientId);
  // Only bookings without an UPLOADED report make sense to upload into.
  const availableBookings =
    selectedPatient?.bookings.filter((b) => b.report?.status !== "UPLOADED") ??
    [];

  function resetForm() {
    setPatientId("");
    setBookingId("");
    setRemarks("");
    setFile(null);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!bookingId) {
      toast.warning("Please select a booking");
      return;
    }
    if (!file) {
      toast.warning("Please choose a report file");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bookingId", bookingId);
      formData.append("remarks", remarks);

      const res = await fetch("/api/admin/reports/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.message || "Failed to upload report");
        return;
      }

      toast.success("Report uploaded successfully");
      resetForm();
      setOpen(false);
      onUploaded();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while uploading the report");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Upload Report</Button>
      </DialogTrigger>

      <DialogContent className={ADMIN_DIALOG_CLASS}>
        <form onSubmit={handleUpload}>
          <DialogHeader>
            <DialogTitle>Upload Report</DialogTitle>
            <DialogDescription>
              Attach a report file to a patient&apos;s booking.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-5">
            <Field>
              <Label>Patient</Label>
              <Select
                value={patientId}
                onValueChange={(v) => {
                  setPatientId(v);
                  setBookingId("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Patient" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Patients</SelectLabel>

                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label>Booking</Label>
              <Select
                value={bookingId}
                onValueChange={setBookingId}
                disabled={!patientId}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      !patientId
                        ? "Select a patient first"
                        : availableBookings.length === 0
                        ? "No pending bookings"
                        : "Select booking"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Bookings</SelectLabel>

                    {availableBookings.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.tests.map((t) => t.test.title).join(", ")} —{" "}
                        {new Date(b.appointmentDate).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label>Remarks (optional)</Label>
              <Input
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Any notes about this report"
              />
            </Field>

            <Field>
              <Label>Report file (PDF)</Label>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </Field>

            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}