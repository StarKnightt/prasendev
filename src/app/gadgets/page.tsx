import React, { Suspense } from 'react';
import { GadgetCard } from '@/components/gadgets/gadget-card';
import { products } from '@/data/products';
import { DATA } from '@/data/resume';
import BlurFade from '@/components/magicui/blur-fade';
import { GadgetSkeleton } from "@/components/skeletons/gadget-skeleton";
import { Cpu, Smartphone, Headphones, Wrench, ArrowUpRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GadgetsFilter } from '@/components/gadgets/gadgets-filter';

export const metadata = {
  title: "Gadgets",
  description: "My tech setup - PC components, peripherals, and productivity tools I use daily as a developer.",
};

const categoryConfig: Record<string, { icon: React.ElementType; order: number }> = {
  'PC Components': { icon: Cpu, order: 1 },
  'Peripherals': { icon: Headphones, order: 2 },
  'Mobile': { icon: Smartphone, order: 3 },
};

export default function GadgetsPage() {
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  const sortedCategories = Object.keys(productsByCategory).sort((a, b) => {
    const orderA = categoryConfig[a]?.order ?? 99;
    const orderB = categoryConfig[b]?.order ?? 99;
    return orderA - orderB;
  });

  const hardwareContent = (
    <div className="space-y-16">
      {sortedCategories.map((category, categoryIndex) => {
        const CategoryIcon = categoryConfig[category]?.icon ?? Cpu;
        const categoryProducts = productsByCategory[category];

        return (
          <BlurFade key={category} delay={0.1 * categoryIndex}>
            <section>
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
  );

  const softwareContent = (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Wrench className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Tools & Software</h2>
          <p className="text-sm text-muted-foreground">
            Apps and software I use to code and stay productive.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DATA.tools.map((tool, index) => (
          <BlurFade key={tool.name} delay={0.04 * index} inView>
            <a
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm dark:border-border/40 dark:bg-zinc-900/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md dark:hover:bg-zinc-800/90"
            >
              <div className="rounded-lg border border-border/50 bg-muted/50 p-2 shrink-0">
                {"customIcon" in tool ? (
                  <tool.customIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                ) : (
                  <FontAwesomeIcon icon={tool.icon} className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 mt-0.5 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
            </a>
          </BlurFade>
        ))}
      </div>
    </div>
  );

  return (
    <main className="container max-w-5xl mx-auto px-4 py-12">
      <Suspense fallback={<GadgetSkeleton />}>
        <BlurFade>
          <div className="max-w-3xl mx-auto mb-12 text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Tech Setup</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Products I personally use and recommend. Buying through my affiliate links helps support my work.
            </p>
          </div>
        </BlurFade>

        <GadgetsFilter
          hardware={hardwareContent}
          software={softwareContent}
        />
      </Suspense>
    </main>
  );
}
