"use client"

interface Appointment {
  name: string
  date: string
  type: "consultation" | "service"
}

export default function UpcomingAppointments() {
  const appointments: Appointment[] = [
    { name: "Emma Wilson", date: "2024-12-18 at 09:00", type: "consultation" },
    { name: "Michael Chen", date: "2024-12-18 at 11:30", type: "service" },
    { name: "Sarah Davis", date: "2024-12-18 at 14:00", type: "consultation" },
    { name: "James Brown", date: "2024-12-19 at 16:30", type: "service" },
  ]

  const getTypeColor = (type: "consultation" | "service") => {
    return type === "consultation" ? "bg-violet-100 text-violet-700" : "bg-emerald-100 text-emerald-700"
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Upcoming Appointments</h3>

      <div className="space-y-3">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{appointment.name}</p>
                <p className="text-xs text-muted-foreground">{appointment.date}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(appointment.type)}`}>
              {appointment.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}