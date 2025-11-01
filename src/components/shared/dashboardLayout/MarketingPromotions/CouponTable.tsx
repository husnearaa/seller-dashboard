"use client";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Trash2 } from "lucide-react";
import { CustomPagination } from "../../CustomPagination";
import { useState } from "react";

interface CouponData {
  id: string;
  code: string;
  value: string;
  type: string;
  validity: string;
  status: "Active" | "Scheduled";
  usageLimit: string;
}

const mockData: CouponData[] = [
  {
    id: "1",
    code: "NEW20",
    value: "Percentage",
    type: "20%",
    validity: "Sept 20 - Oct 30",
    status: "Active",
    usageLimit: "45/100",
  },
  {
    id: "2",
    code: "FESTIVE50",
    value: "Amount",
    type: "$-$",
    validity: "Sept 20 - Oct 30",
    status: "Scheduled",
    usageLimit: "Unlimited",
  },
  {
    id: "3",
    code: "Tip Deal",
    value: "Percentage",
    type: "28%",
    validity: "Sept 20 - Oct 30",
    status: "Active",
    usageLimit: "35/100",
  },
  {
    id: "4",
    code: "NIVAH",
    value: "Amount",
    type: "15-$$",
    validity: "Sept 20 - Oct 30",
    status: "Scheduled",
    usageLimit: "Unlimited",
  },
];

export function CouponTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = mockData.length; // Use the actual length of your data

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Coupon List</h2>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search coupon and promotion by name or type"
              className="rounded-md border border-border bg-background px-4 py-2 pl-10 text-sm text-foreground placeholder-muted-foreground"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
          </div>
          <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4" />
            Add New Advertisement
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-border">
              <th className="w-12 px-6 py-3">
                <Checkbox />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Coupon Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Value
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Validity
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Usage Limit
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <Checkbox />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {item.code}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {item.value}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {item.type}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {item.validity}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {item.usageLimit}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Checkbox className="h-5 w-5 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <CustomPagination
        totalItems={totalItems} // Now using the actual data length
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}
