import { cn } from 'cn';
import type { PropsWithChildren } from 'react';

export default function AppContainer({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
  );
}
