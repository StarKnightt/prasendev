// components/visitor-counter.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  // Show placeholder until mounted
  if (isLoading || count === null) {
    return (
      <div className="text-sm text-muted-foreground flex items-center gap-1.5">
        <Eye className="size-3.5" />
        <span className="tabular-nums opacity-50">---</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
      title="Unique visitors"
    >
      <Eye className="size-3.5" />
      <motion.span
        key={count}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="tabular-nums"
        suppressHydrationWarning
      >
        {count.toLocaleString()}
      </motion.span>
    </motion.div>
  );
}