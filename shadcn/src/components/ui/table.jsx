import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      data-slot="table"
      ref={ref}
      {...props}
    />
  </div>
));

Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead className={cn("[&_tr]:border-b", className)} data-slot="table-header" ref={ref} {...props} />
));

TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} data-slot="table-body" ref={ref} {...props} />
));

TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
    data-slot="table-footer"
    ref={ref}
    {...props}
  />
));

TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    className={cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)}
    data-slot="table-row"
    ref={ref}
    {...props}
  />
));

TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    className={cn(
      "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    data-slot="table-head"
    ref={ref}
    {...props}
  />
));

TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    className={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
    data-slot="table-cell"
    ref={ref}
    {...props}
  />
));

TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption className={cn("text-muted-foreground mt-4 text-sm", className)} data-slot="table-caption" ref={ref} {...props} />
));

TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
