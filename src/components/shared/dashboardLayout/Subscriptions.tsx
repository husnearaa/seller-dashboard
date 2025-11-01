/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Eye, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { CustomPagination } from "../CustomPagination"


const SubscriptionDemoData = [
  {
    id: 1,
    name: "Premium Wellness Plan",
    avatar: "💆",
    type: "Weekly",
    subscriber: "30 Active",
    renewalStatus: "Auto",
    price: "$2,742.00",
  },
  {
    id: 2,
    name: "Property Build",
    avatar: "🏗️",
    type: "Monthly",
    subscriber: "20 Active",
    renewalStatus: "Auto",
    price: "$2,742.00",
  },
  {
    id: 3,
    name: "Massage",
    avatar: "💆",
    type: "Yearly",
    subscriber: "25 Active",
    renewalStatus: "Manual",
    price: "$2,742.00",
  },
  {
    id: 4,
    name: "Pet Care",
    avatar: "🐾",
    type: "Monthly",
    subscriber: "10 Active",
    renewalStatus: "Auto",
    price: "$2,742.00",
  },
  {
    id: 5,
    name: "Facial",
    avatar: "💅",
    type: "Monthly",
    subscriber: "10 Active",
    renewalStatus: "Manual",
    price: "$2,742.00",
  },
  {
    id: 6,
    name: "Pet Care",
    avatar: "🐕",
    type: "Yearly",
    subscriber: "10 Active",
    renewalStatus: "Auto",
    price: "$2,742.00",
  },
  {
    id: 7,
    name: "Yoga",
    avatar: "🧘",
    type: "Weekly",
    subscriber: "10 Active",
    renewalStatus: "Manual",
    price: "$2,742.00",
  },
  {
    id: 8,
    name: "Gardening",
    avatar: "🌿",
    type: "Weekly",
    subscriber: "10 Active",
    renewalStatus: "Auto",
    price: "$2,742.00",
  },
  {
    id: 9,
    name: "Therapy",
    avatar: "🧠",
    type: "Yearly",
    subscriber: "10 Active",
    renewalStatus: "Manual",
    price: "$2,742.00",
  },
  {
    id: 10,
    name: "Event Organization",
    avatar: "🎉",
    type: "Weekly",
    subscriber: "10 Active",
    renewalStatus: "Auto",
    price: "$2,742.00",
  },
  {
    id: 11,
    name: "Therapy",
    avatar: "🧠",
    type: "Yearly",
    subscriber: "10 Active",
    renewalStatus: "Manual",
    price: "$2,742.00",
  },
  {
    id: 12,
    name: "Event Organization",
    avatar: "🎉",
    type: "Weekly",
    subscriber: "10 Active",
    renewalStatus: "Auto",
    price: "$2,742.00",
  },
]

export default function Subscriptions() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subscriptionData, setSubscriptionData] = useState(SubscriptionDemoData)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const getRenewalStatusColor = (status: string) => {
    if (status === "Auto") {
      return "bg-green-100 text-green-700"
    }
    return "bg-gray-100 text-gray-700"
  }

  // Filter subscriptions based on search query
  const filteredSubscriptions = useMemo(() => {
    return subscriptionData.filter(
      (subscription) =>
        subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [subscriptionData, searchQuery])

  // Calculate pagination for filtered data
  const totalItems = filteredSubscriptions.length
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredSubscriptions.slice(indexOfFirstItem, indexOfLastItem)

  const handleDeleteClick = (subscription: any) => {
    setSelectedSubscription(subscription)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedSubscription) {
      setSubscriptionData((prev) => prev.filter((subscription) => subscription.id !== selectedSubscription.id))
      setDeleteDialogOpen(false)
      setSelectedSubscription(null)
      toast.success("Subscription deleted successfully", {
        description: `${selectedSubscription.name} has been removed.`,
      })
    }
  }

  const handleViewClick = (subscription: any) => {
    setSelectedSubscription(subscription)
    setViewDialogOpen(true)
  }

  return (
    <div className="bg-gray-50 p-8">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscription management</h1>
            <p className="mt-1 text-sm text-gray-600">Dashboard &gt; Subscription</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search consultations by name or type"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 bg-white border-gray-200"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="w-12 px-6 py-4">
                    <Checkbox />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subscriber</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Renewal Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                          {subscription.avatar}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{subscription.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{subscription.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{subscription.subscriber}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium ${getRenewalStatusColor(
                          subscription.renewalStatus,
                        )}`}
                      >
                        {subscription.renewalStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{subscription.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => handleViewClick(subscription)}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => handleDeleteClick(subscription)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <CustomPagination
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{selectedSubscription?.name}</strong>? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete} className="flex-1">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Subscription Details</DialogTitle>
            </DialogHeader>

            {selectedSubscription && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                    {selectedSubscription.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedSubscription.name}</h3>
                    <p className="text-sm text-gray-600">{selectedSubscription.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Type</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSubscription.type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Subscriber</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSubscription.subscriber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Renewal Status</p>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getRenewalStatusColor(
                        selectedSubscription.renewalStatus,
                      )}`}
                    >
                      {selectedSubscription.renewalStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Price</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSubscription.price}</p>
                  </div>
                </div>

                <DialogFooter className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setViewDialogOpen(false)} className="flex-1">
                    Close
                  </Button>
                  <Button className="flex-1 bg-gray-800 text-white hover:bg-gray-900">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
