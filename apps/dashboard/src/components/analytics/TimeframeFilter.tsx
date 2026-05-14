"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FilterDropdown } from "@/components/ui/filter-dropdown"

export function TimeframeFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const timeframe = searchParams.get("timeframe") || "today"

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("timeframe", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <FilterDropdown 
      placeholder="Timeframe"
      value={timeframe}
      onValueChange={handleValueChange}
      options={[
        { label: "Today", value: "today" },
        { label: "Yesterday", value: "yesterday" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        { label: "This Year", value: "year" },
      ]}
    />
  )
}
