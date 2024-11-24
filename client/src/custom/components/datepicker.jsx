"use client"

import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@common/components/ui/button"
import { Calendar } from "@common/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@common/components/ui/popover"
import { cn } from "@common/lib/utils"

export function DatePickerWithRange({
  className,
  value = {
    to: new Date(),
    from: addDays(new Date(), -15),
  },
  onChange = () => { },
  maxDays = 30,
}) {
  const [date, setDate] = React.useState(value)
  const handleDateChange = (date) => {
    if (date.from && date.to) {
      const diff = date.to - date.from
      if (diff > maxDays * 24 * 60 * 60 * 1000) {
        date.to = addDays(date.from, maxDays)
      }
    }
    setDate(date)
    onChange(date)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-base-100 hover:bg-primary/30 hover:text-base-900",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            className="w-auto bg-base-100 text-base-content"
            classNames={{
              day_selected: "bg-primary rounded-none",
              day_range_middle: "bg-base-100/30 text-base-100 rounded-none",

            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
