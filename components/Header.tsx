"use client";

import { useState } from "react";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";

const navItems = [{
  id: 1,
  name: "Work",
  link: "#clients"
}, {
  id: 2,
  name: "About",
  link: "#about"
}, {
  id: 3,
  name: "Services",
  link: "#services"
}, {
  id: 4,
  name: "Contact",
  link: "#footer"
}];

interface HeaderProps {
  onOpenContact: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-5 sm:px-8 lg:px-12 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group">
          <span className="text-2xl font-bold text-white font-(family-name:--font-cormorant) leading-none tracking-wide">
            Ovation
          </span>
          <span className="block text-[10px] text-white/90 uppercase tracking-[0.2em] font-medium mt-0.5">
            Creative Studios
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-x-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="relative text-xs text-white/80 uppercase tracking-[0.15em] font-bold transition-colors duration-300 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-white/20 text-white transition-all duration-300 md:hidden"
          >
            {open ? <MdClose size={24} /> : <MdMenu size={30} />}
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="hidden md:inline-flex items-center px-6 py-2.5 text-[13px] font-bold text-white bg-transparent border-[1.5px] border-white/30 hover:border-white transition-all duration-300 uppercase tracking-[0.15em] rounded-sm"
          >
            Get in touch
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-transform duration-300 ease-out md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="relative h-full px-6 py-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 inline-flex items-center justify-center w-10 h-10 rounded-sm border border-white/20 text-white"
          >
            <MdClose size={22} />
          </button>

          <div className="flex h-full flex-col justify-center gap-10">
            <div className="space-y-7">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="block text-2xl font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:text-brand"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenContact();
              }}
              className="inline-flex w-full items-center justify-center rounded-sm bg-brand px-7 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-white/90"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}