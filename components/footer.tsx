import Link from "next/link";
import { Activity, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-(--surface-alt)">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4 sm:px-6">
        {/* Brand Section */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-primary-foreground">
              <Activity className="h-5 w-5" />
            </span>

            <span className="text-xl font-bold text-foreground">
              Onkar Lab Diagnostics
            </span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            NABL-accredited diagnostic laboratory delivering accurate,
            affordable, and timely test results with modern technology and
            expert care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Quick Links
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-primary"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/tests"
                className="transition-colors hover:text-primary"
              >
                Lab Tests
              </Link>
            </li>

            <li>
              <Link
                href="/book"
                className="transition-colors hover:text-primary"
              >
                Book Appointment
              </Link>
            </li>

            <li>
              <Link
                href="/report"
                className="transition-colors hover:text-primary"
              >
                Download Reports
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-primary"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Contact
          </h4>

          <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                12 Health Park,
                <br />
                Bengaluru, Karnataka 560001
              </span>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+91 80 4000 1234</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0" />
              <span>hello@onkarlabs.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} Onkar Lab Diagnostics. All rights
            reserved.
          </p>

          <p>Trusted Healthcare • Accurate Results • Fast Reports</p>
        </div>
      </div>
    </footer>
  );
}