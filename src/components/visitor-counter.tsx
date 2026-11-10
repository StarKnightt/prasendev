'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

// Helper to get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

type CounterState =
  | { status: 'loading' }
  | { status: 'ready'; count: number }
  | { status: 'error' };

export default function VisitorCounter() {
  const [state, setState] = useState<CounterState>({ status: 'loading' });

  useEffect(() => {
    let active = true;

    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const count = data?.count;
        if (typeof count !== 'number' || !Number.isFinite(count) || count < 1) {
          throw new Error('Invalid visitor count');
        }
        if (active) setState({ status: 'ready', count });
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        if (active) setState({ status: 'error' });
      }
    };

    fetchVisitorCount();
    return () => {
      active = false;
    };
  }, []);

  // A failed count is hidden rather than shown as "0th visitor".
  if (state.status === 'error') return null;

  if (state.status === 'loading') {
    return (
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Eye className="size-4" />
        <span className="opacity-50">Loading...</span>
      </div>
    );
  }

  const { count } = state;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm text-muted-foreground flex items-center gap-2"
      title="You are a unique visitor!"
    >
      <Eye className="size-4" />
      <span>
        You are the{' '}
        <motion.span
          key={count}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-foreground tabular-nums"
          suppressHydrationWarning
        >
          {count.toLocaleString()}
          <sup className="text-xs">{getOrdinalSuffix(count)}</sup>
        </motion.span>
        {' '}visitor
      </span>
    </motion.div>
  );
}