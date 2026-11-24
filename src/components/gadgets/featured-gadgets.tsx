'use client';

import React from 'react';
import { GadgetCard } from './gadget-card';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FeaturedGadgets = () => {
  const featuredGadgets = products.filter(product => product.featured).slice(0, 2);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Gadgets</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredGadgets.map((product) => (
          <GadgetCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href="/gadgets"
        className="mt-4 block"
      >
          <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-foreground/60 px-5 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background sm:w-auto">
            View all gadgets <span aria-hidden>&rarr;</span>
          </span>
      </Link>
    </div>
  );
};

export { FeaturedGadgets };
