'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/data/products';
import Link from 'next/link';
import { MagicCard } from "@/components/magicui/magic-card";
import { ExternalLink } from "lucide-react";

interface GadgetCardProps {
  product: Product;
}

export function GadgetCard({ product }: GadgetCardProps) {
  return (
    <Link
      href={product.amazonLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MagicCard className="group relative overflow-hidden bg-card rounded-xl h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-muted/30">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={product.featured}
          />
          {product.featured && (
            <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
              Featured
            </Badge>
          )}
          {/* Hover overlay with external link icon */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <ExternalLink className="size-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-muted-foreground text-xs line-clamp-2">
            {product.description}
          </p>
        </div>
      </MagicCard>
    </Link>
  );
}
