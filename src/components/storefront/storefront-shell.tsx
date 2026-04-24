"use client";

import { Heart, ShoppingBag, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { CartDrawer } from "./cart-drawer";
import { useState } from "react";

type StorefrontShellProps = {
  children: React.ReactNode;
};

export function StorefrontShell({ children }: StorefrontShellProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-20 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center px-4 md:px-6">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <ShoppingBag className="size-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                NextCart
              </span>
            </Link>
          </div>

          <nav className="ml-6 hidden items-center gap-1 sm:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2">

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Wishlist"
              className="rounded-full hover:bg-neutral-100"
            >
              <Heart className="size-4" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative rounded-full hover:bg-neutral-100"
              onClick={() => setOpen(true)}
            >
              <ShoppingCart className="size-4" />

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-medium text-white">
                  {cart.length}
                </span>
              )}
            </Button>

            {/* Account */}
            <Button
              variant="outline"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border-neutral-200 hover:bg-neutral-100"
            >
              <UserRound className="size-4" />
              Account
            </Button>
          </div>
        </div>

        <nav className="mx-auto flex h-11 w-full max-w-[1280px] items-center gap-2 overflow-x-auto border-t px-4 sm:hidden">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 md:px-6">
        {children}
      </div>
      <CartDrawer open={open} setOpen={setOpen} />
    </main>
  );
}
