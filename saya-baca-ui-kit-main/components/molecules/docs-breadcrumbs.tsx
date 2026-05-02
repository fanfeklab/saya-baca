'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import React from 'react';

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  if (!pathname) return null;

  // e.g., /demo/components/atoms/buttons -> ["demo", "components", "atoms", "buttons"]
  const paths = pathname.split('/').filter(Boolean);
  
  // if we are just at /demo/components, no need for complex breadcrumbs
  if (paths.length <= 2) return null;

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-6 overflow-hidden whitespace-nowrap">
      {paths.map((path, index) => {
        const title = parseInt(path) ? path : path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
        const isLast = index === paths.length - 1;
        const href = `/${paths.slice(0, index + 1).join('/')}`;

        return (
          <React.Fragment key={path}>
            {index > 0 && <ChevronRight className="w-4 h-4 shrink-0" />}
            {isLast ? (
              <span className="font-bold text-foreground truncate">{title}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors truncate">
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
