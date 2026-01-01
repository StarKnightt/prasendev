'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { GadgetCard } from '@/components/gadgets/gadget-card';
import { GadgetFilters } from '@/components/gadgets/gadget-filters';
import { products } from '@/data/products';
import BlurFade from '@/components/magicui/blur-fade';
import { GadgetSkeleton } from "@/components/skeletons/gadget-skeleton";
import { PackageSearch } from 'lucide-react';

export default function GadgetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories with counts
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)));
  }, []);

  // Filter and sort products (featured first)
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = searchQuery === '' || 
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        // Featured products first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== '';

  return (
    <main className="container max-w-6xl mx-auto px-4 py-12">
      <Suspense fallback={<GadgetSkeleton />}>
        <BlurFade>
          <div className="max-w-3xl mx-auto mb-16 text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Tech Setup 🚀</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I use these products for my personal use and recommend them to others, it will help me a lot if you buy through my affiliate links.
            </p>
          </div>
          
          <div className="space-y-6">
            <GadgetFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />

            {/* Results count & active filters */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> of {products.length} gadgets
              </span>
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">•</span>
                  {searchQuery && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                      Search: "{searchQuery}"
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                      {selectedCategory}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-muted rounded-full">
                    <PackageSearch className="size-8 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">No gadgets found</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product, index) => (
                  <BlurFade key={product.id} delay={0.05 * index} inView>
                    <GadgetCard product={product} />
                  </BlurFade>
                ))}
              </div>
            )}
          </div>
        </BlurFade>
      </Suspense>
    </main>
  );
}
