"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mo", sales: 80, earnings: 60 },
  { name: "Tu", sales: 180, earnings: 140 },
  { name: "We", sales: 100, earnings: 70 },
  { name: "Th", sales: 140, earnings: 120 },
  { name: "Fr", sales: 210, earnings: 180 },
  { name: "Sa", sales: 280, earnings: 220 },
  { name: "Su", sales: 180, earnings: 140 },
]

export function SalesTrendChart() {
  return (
    <Card className="p-6 rounded-xl border border-border">
      <h3 className="text-lg font-semibold mb-4">Sales & Earnings Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="earnings" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
