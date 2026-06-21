
import { Mail, MapPin, Phone, Clock } from "lucide-react";


 export default function ContactPage() {
  const items = [
    {
      icon: MapPin,
      title: "Visit Us",
      text: "12 Health Park, Bengaluru 560001",
    },
    {
      icon: Phone,
      title: "Call Us",
      text: "+91 80 4000 1234",
    },
    {
      icon: Mail,
      title: "Email Us",
      text: "hello@medilab.in",
    },
    {
      icon: Clock,
      title: "Working Hours",
      text: "Mon - Sat · 8:00 AM - 8:00 PM",
    },
  ];

  return (
    
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Need help with appointments, reports, or home sample collection?
            Our team is available to assist you.
          </p>
        </div>

        {/* Main Section */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Contact Cards */}
          <div className="space-y-5">
            {items.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Send us a Message
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows={2}
                  placeholder="Type your message..."
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        
      </section>

  );
}