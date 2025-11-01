"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Settings, Clock } from "lucide-react"
import WeeklyAvailability from "@/components/weekly-availability"
import UpcomingAppointments from "@/components/upcoming-appointments"
import CalendarView from "./CalendarView"



export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 28)) // Sept 28, 2025
  const [viewMode, setViewMode] = useState<"week" | "month">("week")

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar & Schedule</h1>
            <p className="text-muted-foreground mt-1">Manage your availability and appointments</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium">
              <Settings size={16} />
              Availability Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <Clock size={16} />
              Block Time
            </button>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={handlePrevWeek} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronLeft size={20} className="text-foreground" />
              </button>
              <h2 className="text-xl font-semibold text-foreground min-w-48">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <button onClick={handleNextWeek} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronRight size={20} className="text-foreground" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleToday}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Today
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "week"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode("month")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "month"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          <CalendarView currentDate={currentDate} />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-8">
          <WeeklyAvailability />
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  )
}
