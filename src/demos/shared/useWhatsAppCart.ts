import { useState } from "react";
import { formatBRL } from "../../lib/format";

export interface CartItemInput {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends CartItemInput {
  qty: number;
}

export interface UseWhatsAppCartReturn {
  items: CartItem[];
  add: (item: CartItemInput) => void;
  remove: (id: string) => void;
  clear: () => void;
  getItemQty: (id: string) => number;
  total: number;
  totalItems: number;
  toCartLines: () => string[];
}

export function useWhatsAppCart(): UseWhatsAppCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (input: CartItemInput) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === input.id);
      if (existing) {
        return prev.map((item) =>
          item.id === input.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...input, qty: 1 }];
    });
  };

  const remove = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const clear = () => {
    setItems([]);
  };

  const getItemQty = (id: string): number => {
    return items.find((item) => item.id === id)?.qty ?? 0;
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  const toCartLines = (): string[] => {
    if (items.length === 0) return [];
    const lines = items.map(
      (item) =>
        `${item.qty}x ${item.name} — ${formatBRL(item.price * item.qty)}`,
    );
    lines.push(`Total: ${formatBRL(total)}`);
    return lines;
  };

  return {
    items,
    add,
    remove,
    clear,
    getItemQty,
    total,
    totalItems,
    toCartLines,
  };
}
