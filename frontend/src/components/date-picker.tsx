"use client";

// import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
// import { Button } from "../components/ui/button";
import { Button } from "../components/ui/button";

import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

interface DatePickerProps {
  selected: Date;
  onChange: (date: Date | undefined) => void;
}
export function DatePicker({ selected, onChange }: DatePickerProps) {
  //   const [date, setDate] = React.useState<Date>();
  const handleDateChange = (date: Date | undefined) => {
    onChange(date);
    // setDate(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
