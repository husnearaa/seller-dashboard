import { Badge } from "@/components/ui/badge"

const orders = [
  {
    name: "Alice Johnson",
    type: "Product",
    amount: "$89.99",
    status: "completed",
    time: "2 hours ago",
  },
  {
    name: "Bob Smith",
    type: "Service",
    amount: "$150.00",
    status: "pending",
    time: "4 hours ago",
  },
  {
    name: "Carol Davis",
    type: "Consultation",
    amount: "$75.00",
    status: "confirmed",
    time: "6 hours ago",
  },
  {
    name: "David Wilson",
    type: "Subscription",
    amount: "$29.99",
    status: "active",
    time: "8 hours ago",
  },
]

const statusColors = {
  completed: "bg-gray-900 text-white hover:bg-gray-800",
  pending: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  confirmed: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  active: "bg-gray-200 text-gray-700 hover:bg-gray-300",
}

const typeColors = {
  Product: "text-blue-600",
  Service: "text-green-600",
  Consultation: "text-purple-600",
  Subscription: "text-red-600",
}

export function RecentOrders() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders & Bookings</h2>
        <button className="text-sm text-gray-600 hover:text-gray-900">View All</button>
      </div>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{order.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-sm font-medium ${typeColors[order.type as keyof typeof typeColors]} border border-current px-2 py-0.5 rounded`}>
                  {order.type}
                </span>
                <span className="text-sm text-gray-500">{order.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">{order.amount}</span>
              <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
