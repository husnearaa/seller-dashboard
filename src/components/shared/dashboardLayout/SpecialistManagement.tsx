/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { CustomPagination } from "../CustomPagination";

const SpecialistDemoData = [
  {
    id: 1,
    name: "Premium Wellness Plan",
    avatar: "💆",
    type: "Economist",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Active",
    fees: "$2,742.00",
  },
  {
    id: 2,
    name: "Property Build",
    avatar: "🏗️",
    type: "Beauty Specialist",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Active",
    fees: "$2,742.00",
  },
  {
    id: 3,
    name: "Massage",
    avatar: "💆",
    type: "Massage Expert",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Inactive",
    fees: "$2,742.00",
  },
  {
    id: 4,
    name: "Pet Care",
    avatar: "🐾",
    type: "Hair Specialist",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Active",
    fees: "$2,742.00",
  },
  {
    id: 5,
    name: "Facial",
    avatar: "💅",
    type: "Massage Expert",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Inactive",
    fees: "$2,742.00",
  },
  {
    id: 6,
    name: "Pet Care",
    avatar: "🐕",
    type: "Economist",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Active",
    fees: "$2,742.00",
  },
  {
    id: 7,
    name: "Yoga",
    avatar: "🧘",
    type: "Massage Expert",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Inactive",
    fees: "$2,742.00",
  },
  {
    id: 8,
    name: "Gardening",
    avatar: "🌿",
    type: "Massage Expert",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Active",
    fees: "$2,742.00",
  },
  {
    id: 9,
    name: "Therapy",
    avatar: "🧠",
    type: "Beauty Specialist",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Inactive",
    fees: "$2,742.00",
  },
  {
    id: 10,
    name: "Event Organization",
    avatar: "🎉",
    type: "Specialist",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Active",
    fees: "$2,742.00",
  },
  {
    id: 11,
    name: "Therapy",
    avatar: "🧠",
    type: "Beauty Specialist",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Inactive",
    fees: "$2,742.00",
  },
  {
    id: 12,
    name: "Event Organization",
    avatar: "🎉",
    type: "Specialist",
    available: "27 Sept 8:45 PM",
    duration: "30 Mins",
    status: "Active",
    fees: "$2,742.00",
  },
];

export default function SpecialistManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialists, setSpecialists] = useState(SpecialistDemoData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "text-green-600"
      : "text-gray-400";
  };

  // Filter specialists by name or type
  const filteredSpecialists = useMemo(() => {
    return specialists.filter(
      (specialist) =>
        specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialist.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [specialists, searchQuery]);

  // Pagination logic
  const totalItems = filteredSpecialists.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSpecialists.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleDeleteClick = (specialist: any) => {
    setSelectedSpecialist(specialist);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSpecialist) {
      setSpecialists((prev) =>
        prev.filter((s) => s.id !== selectedSpecialist.id)
      );
      setDeleteDialogOpen(false);
      toast.success("Specialist deleted successfully", {
        description: `${selectedSpecialist.name} has been removed.`,
      });
    }
  };

  const handleViewClick = (specialist: any) => {
    setSelectedSpecialist(specialist);
    setViewDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Specialist</h1>
            <p className="mt-1 text-sm text-gray-600">Dashboard &gt; Specialist</p>
          </div>
          <Link href={"/seller-dashboard/specialist/add-specialist"}>
            <Button className="bg-gray-800 text-white hover:bg-gray-900">
              Add New Specialist
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search Specialist by name or type"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Specialist
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Available
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Fees
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((specialist) => (
                  <tr
                    key={specialist.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                          {specialist.avatar}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {specialist.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {specialist.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {specialist.available}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {specialist.duration}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-medium ${getStatusColor(
                        specialist.status
                      )}`}
                    >
                      {specialist.status}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {specialist.fees}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => handleViewClick(specialist)}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => handleDeleteClick(specialist)}
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
              <DialogTitle>Delete Specialist</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <strong>{selectedSpecialist?.name}</strong>? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                className="flex-1"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Specialist Details</DialogTitle>
            </DialogHeader>

            {selectedSpecialist && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                    {selectedSpecialist.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedSpecialist.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedSpecialist.type}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      Available
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedSpecialist.available}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      Duration
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedSpecialist.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      Status
                    </p>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        selectedSpecialist.status
                      )}`}
                    >
                      {selectedSpecialist.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      Fees
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedSpecialist.fees}
                    </p>
                  </div>
                </div>

                <DialogFooter className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setViewDialogOpen(false)}
                    className="flex-1"
                  >
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
  );
}
