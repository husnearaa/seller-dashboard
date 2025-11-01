"use client"

interface CalendarViewProps {
  currentDate: Date
}

export default function CalendarView({ currentDate }: CalendarViewProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 08:00 to 19:00

  // Get the start of the week (Sunday)
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  // Generate 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return date
  })

  const formatTime = (hour: number) => {
    return `${String(hour).padStart(2, "0")}:00`
  }

  const formatDate = (date: Date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
    const dateNum = date.getDate()
    const monthName = date.toLocaleDateString("en-US", { month: "short" })
    return `${dayName}, ${monthName} ${dateNum}`
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Time and Day Headers */}
        <div className="flex">
          <div className="w-16 flex-shrink-0"></div>
          {days.map((day, i) => (
            <div key={i} className="flex-1 min-w-32 px-4 py-3 border-b border-border text-center">
              <div className="text-sm font-semibold text-foreground">{formatDate(day)}</div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="flex">
          {/* Time Column */}
          <div className="w-16 flex-shrink-0">
            {hours.map((hour) => (
              <div key={hour} className="h-20 border-b border-border flex items-start justify-end pr-3 pt-1">
                <span className="text-xs text-muted-foreground">{formatTime(hour)}</span>
              </div>
            ))}
          </div>

          {/* Days Grid */}
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="flex-1 min-w-32 border-l border-border">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-20 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}