"use client";

import { footerLinks, companyInfo } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { Phone, Mail, MapPin } from "lucide-react";

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
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
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
                      <Link
                        href={link.href}
                        className="text-sm text-body transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <h4 className="mb-4 font-display text-sm font-semibold text-heading">
              Контакты
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${companyInfo.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-accent"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-accent"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {companyInfo.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-xs leading-relaxed text-muted" style={{ overflowWrap: "break-word" }}>
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="break-words">{companyInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-blue-subtle/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="навылет AI — AI-турменеджер для турагентств"
                width={130}
                height={29}
                className="h-7 w-auto"
              />
            </Link>

            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} навылет AI. Все права защищены.
            </p>

            <button
              onClick={() => openForm()}
              className="cursor-pointer rounded-lg bg-surface-alt px-4 py-2 text-xs font-semibold text-muted transition-colors hover:bg-blue-ice hover:text-accent"
            >
              Связаться с нами
            </button>
          </div>

          <div className="mt-6 break-words text-center text-[11px] leading-relaxed text-muted/70">
            {companyInfo.legalName} · ИНН {companyInfo.inn} · ОГРН{" "}
            {companyInfo.ogrn}
          </div>
        </div>
      </div>
    </footer>
  );
}
