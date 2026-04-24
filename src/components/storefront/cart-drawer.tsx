"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export function CartDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[360px] flex flex-col px-4 py-4">
        <SheetHeader className="mb-2">
          <SheetTitle>Your Cart ({cart.length})</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
            Your cart is empty
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 space-y-3 overflow-auto py-2 pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border rounded-lg p-3"
                >
                  <div className="relative size-16">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <p className="text-sm font-medium line-clamp-2">
                      {item.title}
                    </p>

                    <p className="text-xs text-neutral-500">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, "dec")}
                        className="size-6 flex items-center justify-center border rounded"
                      >
                        <Minus className="size-3" />
                      </button>

                      <span className="text-sm">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, "inc")}
                        className="size-6 flex items-center justify-center border rounded"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-red-500"
                    >
                      <Trash2 className="size-4" />
                    </button>

                    <p className="text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t pt-4 mt-2 space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button className="w-full">Checkout</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}