"use client"

import { useState } from "react"
import { Settings2 } from "lucide-react"

interface AvailabilityDay {
  day: string
  time: string
  available: boolean
}

export default function WeeklyAvailability() {
  const [availability, setAvailability] = useState<AvailabilityDay[]>([
    { day: "monday", time: "09:00 - 17:00", available: true },
    { day: "tuesday", time: "09:00 - 17:00", available: true },
    { day: "wednesday", time: "09:00 - 17:00", available: true },
    { day: "thursday", time: "09:00 - 17:00", available: true },
    { day: "friday", time: "09:00 - 16:00", available: true },
    { day: "saturday", time: "10:00 - 15:00", available: true },
    { day: "sunday", time: "Unavailable", available: false },
  ])

  const toggleAvailability = (index: number) => {
    setAvailability((prev) => {
      const newAvailability = [...prev]
      newAvailability[index].available = !newAvailability[index].available
      return newAvailability
    })
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Weekly Availability</h3>

      <div className="space-y-3">
        {availability.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${item.available ? "bg-emerald-500" : "bg-gray-300"}`}></div>
              <span className="text-sm font-medium text-foreground capitalize">{item.day}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{item.time}</span>
              <button
                onClick={() => toggleAvailability(index)}
                className={`p-1.5 rounded hover:bg-muted transition-colors ${item.available ? "text-foreground" : "text-muted-foreground"}`}
              >
                <Settings2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
