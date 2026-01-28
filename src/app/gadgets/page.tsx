import React, { Suspense } from 'react';
import { GadgetCard } from '@/components/gadgets/gadget-card';
import { products } from '@/data/products';
import BlurFade from '@/components/magicui/blur-fade';
import { GadgetSkeleton } from "@/components/skeletons/gadget-skeleton";
import { Cpu, Smartphone, Headphones } from 'lucide-react';

export const metadata = {
  title: "Gadgets",
  description: "My tech setup - PC components, peripherals, and productivity tools I use daily as a developer.",
};

// Category configuration with icons and order
const categoryConfig: Record<string, { icon: React.ElementType; order: number }> = {
  'PC Components': { icon: Cpu, order: 1 },
  'Peripherals': { icon: Headphones, order: 2 },
  'Mobile': { icon: Smartphone, order: 3 },
};

export default function GadgetsPage() {
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  // Sort categories by configured order
  const sortedCategories = Object.keys(productsByCategory).sort((a, b) => {
    const orderA = categoryConfig[a]?.order ?? 99;
    const orderB = categoryConfig[b]?.order ?? 99;
    return orderA - orderB;
  });

  return (
    <main className="container max-w-5xl mx-auto px-4 py-12">
      <Suspense fallback={<GadgetSkeleton />}>
        <BlurFade>
          <div className="max-w-3xl mx-auto mb-16 text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Tech Setup</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Products I personally use and recommend. Buying through my affiliate links helps support my work.
            </p>
          </div>
        </BlurFade>
        
        <div className="space-y-16">
          {sortedCategories.map((category, categoryIndex) => {
            const CategoryIcon = categoryConfig[category]?.icon ?? Cpu;
            const categoryProducts = productsByCategory[category];
            
            return (
              <BlurFade key={category} delay={0.1 * categoryIndex}>
                <section>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <CategoryIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{category}</h2>
                      <p className="text-sm text-muted-foreground">
                        {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categoryProducts.map((product, index) => (
                      <BlurFade key={product.id} delay={0.05 * index} inView>
                        <GadgetCard product={product} />
                      </BlurFade>
                    ))}
                  </div>
                </section>
              </BlurFade>
            );
          })}
        </div>
      </Suspense>
    </main>
  );
}
