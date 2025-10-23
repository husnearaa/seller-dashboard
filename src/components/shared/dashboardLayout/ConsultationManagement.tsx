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
import Link from "next/link"
import { CustomPagination } from "../CustomPagination"

const ConsultationDemoData = [
  {
    id: 1,
    name: "Personal Styling Consultation",
    avatar: "👔",
    type: "Online",
    duration: "30 Mins",
    status: "Active",
    nextSlot: "Sep 28, 3:00 PM",
    price: "$2,742.00",
  },
  {
    id: 2,
    name: "Property Build",
    avatar: "🏗️",
    type: "Offline",
    duration: "20 Mins",
    status: "Active",
    nextSlot: "Sep 27, 3:00 PM",
    price: "$2,742.00",
  },
  {
    id: 3,
    name: "Massage",
    avatar: "💆",
    type: "Online",
    duration: "25 Mins",
    status: "Inactive",
    nextSlot: "Not Available",
    price: "$2,742.00",
  },
  {
    id: 4,
    name: "Pet Care",
    avatar: "🐾",
    type: "Online",
    duration: "10 Mins",
    status: "Active",
    nextSlot: "Oct 02, 3:00 PM",
    price: "$2,742.00",
  },
  {
    id: 5,
    name: "Facial",
    avatar: "💅",
    type: "Offline",
    duration: "10 Mins",
    status: "Inactive",
    nextSlot: "Not Available",
    price: "$2,742.00",
  },
  {
    id: 6,
    name: "Pet Care",
    avatar: "🐕",
    type: "Offline",
    duration: "10 Mins",
    status: "Active",
    nextSlot: "Sep 28, 3:00 PM",
    price: "$2,742.00",
  },
  {
    id: 7,
    name: "Yoga",
    avatar: "🧘",
    type: "Online",
    duration: "10 Mins",
    status: "Inactive",
    nextSlot: "Not Available",
    price: "$2,742.00",
  },
  {
    id: 8,
    name: "Gardening",
    avatar: "🌿",
    type: "Offline",
    duration: "10 Mins",
    status: "Active",
    nextSlot: "Sep 28, 3:00 PM",
    price: "$2,742.00",
  },
  {
    id: 9,
    name: "Therapy",
    avatar: "🧠",
    type: "Online",
    duration: "10 Mins",
    status: "Inactive",
    nextSlot: "Not Available",
    price: "$2,742.00",
  },
  {
    id: 10,
    name: "Event Organization",
    avatar: "🎉",
    type: "Offline",
    duration: "10 Mins",
    status: "Active",
    nextSlot: "Sep 28, 3:00 PM",
    price: "$2,742.00",
  },
  {
    id: 11,
    name: "Event Organization",
    avatar: "🎉",
    type: "Offline",
    duration: "10 Mins",
    status: "Active",
    nextSlot: "Sep 28, 3:00 PM",
    price: "$2,742.00",
  },
  {
    id: 12,
    name: "Event Organization",
    avatar: "🎉",
    type: "Offline",
    duration: "10 Mins",
    status: "Active",
    nextSlot: "Sep 28, 3:00 PM",
    price: "$2,742.00",
  },
]

export default function ConsultationManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [consultationData, setConsultationData] = useState(ConsultationDemoData)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const getStatusColor = (status: string) => {
    if (status === "Active") {
      return "bg-green-100 text-green-700"
    }
    return "bg-red-100 text-red-700"
  }

  const getNextSlotColor = (nextSlot: string) => {
    if (nextSlot === "Not Available") {
      return "bg-red-100 text-red-700"
    }
    return "bg-green-100 text-green-700"
  }

  // Filter consultations based on search query
  const filteredConsultations = useMemo(() => {
    return consultationData.filter(
      (consultation) =>
        consultation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [consultationData, searchQuery])

  // Calculate pagination for filtered data
  const totalItems = filteredConsultations.length
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredConsultations.slice(indexOfFirstItem, indexOfLastItem)

  const handleDeleteClick = (consultation: any) => {
    setSelectedConsultation(consultation)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedConsultation) {
      setConsultationData((prev) => prev.filter((consultation) => consultation.id !== selectedConsultation.id))
      setDeleteDialogOpen(false)
      setSelectedConsultation(null)
      toast.success("Consultation deleted successfully", {
        description: `${selectedConsultation.name} has been removed.`,
      })
    }
  }

  const handleViewClick = (consultation: any) => {
    setSelectedConsultation(consultation)
    setViewDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consultation management</h1>
            <p className="mt-1 text-sm text-gray-600">Dashboard &gt; Consultation</p>
          </div>
          {/* <Link href={"seller-dashboard/consultation/add-consultation"}>
            <Button className="bg-gray-800 text-white hover:bg-gray-900">Add New Consultation</Button>
          </Link> */}
          <Link href={"/seller-dashboard/consultation/add-consultation"}>
            <Button className="bg-gray-800 text-white hover:bg-gray-900">Add New Consultation</Button>
          </Link>
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
                setCurrentPage(1) // Reset to first page when searching
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Next Slot</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((consultation) => (
                  <tr key={consultation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                          {consultation.avatar}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{consultation.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{consultation.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{consultation.duration}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium ${getStatusColor(
                          consultation.status,
                        )}`}
                      >
                        {consultation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex  px-3 py-1 text-xs font-medium ${getNextSlotColor(
                          consultation.nextSlot,
                        )}`}
                      >
                        {consultation.nextSlot}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{consultation.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => handleViewClick(consultation)}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => handleDeleteClick(consultation)}
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
              <DialogTitle>Delete Consultation</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{selectedConsultation?.name}</strong>? This action cannot be
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
              <DialogTitle>Consultation Details</DialogTitle>
            </DialogHeader>

            {selectedConsultation && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                    {selectedConsultation.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConsultation.name}</h3>
                    <p className="text-sm text-gray-600">{selectedConsultation.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Duration</p>
                    <p className="text-sm font-medium text-gray-900">{selectedConsultation.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Status</p>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        selectedConsultation.status,
                      )}`}
                    >
                      {selectedConsultation.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Next Slot</p>
                    <p className="text-sm font-medium text-gray-900">{selectedConsultation.nextSlot}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Price</p>
                    <p className="text-sm font-medium text-gray-900">{selectedConsultation.price}</p>
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