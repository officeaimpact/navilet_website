"use client";

import { footerLinks } from "@/lib/content";
import Image from "next/image";
import { useLeadForm } from "@/contexts/LeadFormContext";

const CTA_HREFS = new Set(["/#cta"]);

export default function Footer() {
  const { openForm } = useLeadForm();
  const sections = [
    footerLinks.product,
    footerLinks.company,
    footerLinks.resources,
    footerLinks.legal,
  ];

  return (
    <footer className="border-t border-blue-subtle/40 bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-display text-sm font-semibold text-heading">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) =>
                  CTA_HREFS.has(link.href) ? (
                    <li key={link.label}>
                      <button
                        onClick={() => openForm()}
                        className="cursor-pointer text-sm text-body transition-colors hover:text-accent"
                      >
                        {link.label}
                      </button>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-body transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-blue-subtle/40 pt-8 sm:flex-row">
          <a href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="AI Tour Assistant"
              width={130}
              height={29}
              className="h-7 w-auto"
            />
          </a>

          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} AI Tour Assistant. Все права
            защищены.
          </p>

          <button
            onClick={() => openForm()}
            className="cursor-pointer rounded-lg bg-surface-alt px-4 py-2 text-xs font-semibold text-muted transition-colors hover:bg-blue-ice hover:text-accent"
          >
            Связаться с нами
          </button>
        </div>
      </div>
    </footer>
  );
}
