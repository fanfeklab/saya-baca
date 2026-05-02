'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/atoms/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-xl w-10 h-10 md:w-12 md:h-12 border-2 border-transparent">
        <Sun className="h-[1.2rem] w-[1.2rem] md:h-6 md:w-6" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="rounded-xl w-10 h-10 md:w-12 md:h-12 border-2 border-foreground  hover:bg-yellow-100  transition-colors"
      id="theme-toggle"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] md:h-6 md:w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] md:h-6 md:w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
