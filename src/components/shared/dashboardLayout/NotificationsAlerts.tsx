import { AlertCircle, Star, RefreshCw } from "lucide-react"

const notifications = [
  {
    icon: AlertCircle,
    text: "Low stock alert: Wireless Headphones (5 left)",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Star,
    text: "New review received for Photography Service",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: RefreshCw,
    text: "3 subscription renewals this week",
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
]

export function NotificationsAlerts() {
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications & Alerts</h2>
      <div className="space-y-4">
        {notifications.map((notification, index) => {
          const Icon = notification.icon
          return (
            <div key={index} className="flex items-start gap-3">
              <div className={`${notification.bgColor} rounded-full p-2`}>
                <Icon className={`w-5 h-5 ${notification.iconColor}`} />
              </div>
              <p className="text-sm text-gray-700 flex-1 pt-1">{notification.text}</p>
            </div>
          )
        })}
      </div>
      <button className="w-full mt-6 text-center text-sm font-medium text-gray-900 hover:text-gray-700 border border-gray-200 rounded-md py-2   hover:bg-gray-50 transition">
        View All Notifications
      </button>
    </div>
  )
}
