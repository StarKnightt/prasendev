'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/data/products';
import Link from 'next/link';
import { MagicCard } from "@/components/magicui/magic-card";
import { ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";

interface GadgetCardProps {
  product: Product;
}

export function GadgetCard({ product }: GadgetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if description is long enough to need expansion (roughly > 100 chars)
  const needsExpansion = product.description.length > 100;

  return (
    <MagicCard className="group relative overflow-hidden bg-card rounded-xl">
      <div className="relative aspect-video">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          priority={product.featured}
        />
        {product.featured && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Featured
          </Badge>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">{product.category}</Badge>
        </div>
        <h3 className="font-semibold mb-2 line-clamp-1 text-lg">{product.title}</h3>
        <div className="mb-4">
          <p className={`text-muted-foreground text-sm ${!isExpanded && needsExpansion ? 'line-clamp-2' : ''}`}>
            {product.description}
          </p>
          {needsExpansion && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:underline mt-1 flex items-center gap-0.5 font-medium"
            >
              {isExpanded ? (
                <>Show less <ChevronUp className="size-3" /></>
              ) : (
                <>Show more <ChevronDown className="size-3" /></>
              )}
            </button>
          )}
        </div>
        
        <Button
          variant="default"
          size="lg"
          className="w-full font-semibold text-base"
          asChild
        >
          <Link
            href={product.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2"
          >
            Buy on Amazon
            <ShoppingCart className="size-4" />
          </Link>
        </Button>
      </div>
    </MagicCard>
  );
}
