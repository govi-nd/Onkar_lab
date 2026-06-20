"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
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
import { title } from "process";
export default function Admin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="flex justify-around mt-16 px-8 gap-2 ">
      <div className="bg-white p-6 rounded-lg border w-[60%]">
        <h1 className="text-2xl font-bold">Recent Bookings</h1>
        <p className="text-gray-500 mt-2">
          Review new patient appointments and test requests.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Tests</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking: any) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    {booking.patientName}
                    </TableCell>
                  <TableCell>
                    {booking.tests.map((test:any)=> test.name).join(",")}
                    </TableCell>
                  <TableCell>
                    {new Date(booking.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {booking.status}
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className=" p-6 rounded-lg border w-[40%]">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <p className="text-gray-500 text-sm mb-4">Common admin tasks</p>

        <div className="flex flex-col gap-3">
          {/* <Button variant="outline"></Button> */}
          <TestDialogBox/>
          <Button variant="outline">Manage Bookings</Button>
          <Button variant="outline">View Patients</Button>
          <Button variant="outline">Upload Report</Button>
        </div>
      </div>
    </div>
  );
}
function TestDialogBox() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState(0);

  async function  createTest (e: React.FormEvent){
       e.preventDefault();
    
    const response = await fetch("/addTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        subtitle,
        price,
        category,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
      setOpen(true);
    }

    alert("Test added successfully");
    setOpen(false);
  }

  
  return (
    <>
    
  
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Test</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={createTest}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold">
              Add test
            </DialogTitle>
            <DialogDescription>Create a new test patients can book </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4">
            <Field>
              <Label>Title</Label>
              <Input  onChange={(e) => setTitle(e.target.value)} placeholder="eg CBC" />
            </Field>

            <Field>
              <Label>Subtitle</Label>
              <Input
                type="text"
              
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Complete blood count "
              />
            </Field>
            <Field>
              <Label>Category</Label>
              <Input
                type="text"
                onChange={(e) => setCategory((e.target.value))}
              />
            </Field>
            <Field>
              <Label>Price</Label>
              <Input
                type="number"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Field>

            <Button type="submit" className="bg-blue-700 hover:bg-blue-500">
              Add
            </Button>
            
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
      </>
  );
}
