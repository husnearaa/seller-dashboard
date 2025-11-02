"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2 } from "lucide-react"

const products = [
  { id: 1, name: "Organic Hair Oil", sold: "150 pcs", revenue: "$1500.99", refunds: "3%", status: "In Stock" },
  { id: 2, name: "Fitness Kit", sold: "180 pcs", revenue: "$1500.99", refunds: "3%", status: "Stock Out" },
  { id: 3, name: "Tops", sold: "180 pcs", revenue: "$1500.99", refunds: "3%", status: "In Stock" },
  { id: 4, name: "Massage Oil", sold: "150 pcs", revenue: "$1500.99", refunds: "3%", status: "In Stock" },
]

export function ProductPerformanceTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return products.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800"
      case "Stock Out":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="p-6 rounded-xl border border-border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Product Performance</h3>
        <input
          type="text"
          placeholder="Search coupon and promotion by name or type"
          className="w-full px-4 py-2 border border-border rounded-lg text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-border">
              <th className="w-12 px-6 py-3">
                <Checkbox />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Product</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Sold</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Revenue</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Refunds</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Stock Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <Checkbox />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{item.name}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item.sold}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item.revenue}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item.refunds}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentPage} of {totalPages}
        </span>
        <Button variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </Card>
  )
}
