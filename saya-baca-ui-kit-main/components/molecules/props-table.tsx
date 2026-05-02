'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PropsTableItem {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropsTableItem[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border-4 border-border bg-card shadow-neo">
      <Table>
        <TableHeader className="bg-secondary border-b-4 border-border">
          <TableRow className="hover:bg-secondary">
            <TableHead className="w-[150px] font-black text-secondary-foreground">Prop</TableHead>
            <TableHead className="w-[150px] font-black text-secondary-foreground">Type</TableHead>
            <TableHead className="w-[120px] font-black text-secondary-foreground">Default</TableHead>
            <TableHead className="font-black text-secondary-foreground">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name} className="border-b-2 border-dashed border-border/50 hover:bg-muted/50 transition-colors">
              <TableCell className="font-mono text-xs font-bold text-foreground bg-muted/20 border-r-2 border-dashed border-border/50">
                {prop.name}
              </TableCell>
              <TableCell className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">{prop.type}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{prop.default || '-'}</TableCell>
              <TableCell className="text-sm font-medium">{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
