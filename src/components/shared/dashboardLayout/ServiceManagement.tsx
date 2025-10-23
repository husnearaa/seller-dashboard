/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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

// Sample service data
const initialServiceData = [
  {
    id: 1,
    name: "Hair Cut",
    icon: "💇",
    category: "Personal Care & Wellness",
    duration: "30 Mins",
    status: "Active",
    slotsAvailable: "20 sets available",
    price: "$2,742.00",
    description: "Professional hair cutting service with styling",
  },
  {
    id: 2,
    name: "Property Build",
    icon: "🏗️",
    category: "Retail & Fashion",
    duration: "1 Hour",
    status: "Active",
    slotsAvailable: "No set available",
    price: "$2,742.00",
    description: "Construction and property development services",
  },
  {
    id: 3,
    name: "Massage",
    icon: "💆",
    category: "Retail & Fashion",
    duration: "25 Mins",
    status: "Inactive",
    slotsAvailable: "05 set available",
    price: "$2,742.00",
    description: "Relaxing massage therapy sessions",
  },
  {
    id: 4,
    name: "Pet Care",
    icon: "🐕",
    category: "Tech & Automotive",
    duration: "10 Mins",
    status: "Active",
    slotsAvailable: "20 sets available",
    price: "$2,742.00",
    description: "Comprehensive pet care and grooming services",
  },
  {
    id: 5,
    name: "Facial",
    icon: "🧖",
    category: "Sell Product",
    duration: "10 Mins",
    status: "Inactive",
    slotsAvailable: "05 set available",
    price: "$2,742.00",
    description: "Skin care and facial treatment services",
  },
];

export default function ServiceManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceData, setServiceData] = useState(initialServiceData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border border-green-200";
      case "Inactive":
        return "bg-gray-100 text-gray-600 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const getSlotColor = (slot: string) => {
    if (slot.includes("20 sets available")) {
      return "bg-green-50 text-green-600 border border-green-200";
    } else if (slot.includes("No set available")) {
      return "bg-red-50 text-red-600 border border-red-200";
    } else if (slot.includes("05 set available")) {
      return "bg-orange-50 text-orange-600 border border-orange-200";
    }
    return "bg-gray-100 text-gray-600 border border-gray-200";
  };

  // Filter services based on search query
  const filteredServices = serviceData.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete click
  const handleDeleteClick = (service: any) => {
    setSelectedService(service);
    setDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (selectedService) {
      setServiceData((prev) =>
        prev.filter((service) => service.id !== selectedService.id)
      );
      setDeleteDialogOpen(false);
      setSelectedService(null);
      toast.success("Service deleted successfully", {
        description: `${selectedService.name} has been removed from your services.`,
      });
    }
  };

  // Handle view click
  const handleViewClick = (service: any) => {
    setSelectedService(service);
    setViewDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-6 flex items-center lg:justify-between justify-center flex-col gap-4 md:flex-row">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Service management
            </h1>
            <p className="mt-1 text-sm text-gray-500">Dashboard &gt; Service</p>
          </div>
          <Link href={"/seller-dashboard/service/add-service"}>
            {" "}
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              Add New Service
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search service by name or type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <Checkbox />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Slot Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl">
                          {service.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {service.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${getStatusColor(
                          service.status
                        )}`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${getSlotColor(
                          service.slotsAvailable
                        )}`}
                      >
                        {service.slotsAvailable}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => handleViewClick(service)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => handleDeleteClick(service)}
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

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Service</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <strong>{selectedService?.name}</strong>? This action cannot be
                undone.
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
                Delete Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Service Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Service Details</DialogTitle>
            </DialogHeader>

            {selectedService && (
              <div className="space-y-6">
                {/* Service Header */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl">
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedService.name}
                    </h3>
                    <p className="text-gray-600">{selectedService.category}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Description
                  </h4>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-600">{selectedService.duration}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Price</h4>
                    <p className="text-gray-600">{selectedService.price}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                    <span
                      className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${getStatusColor(
                        selectedService.status
                      )}`}
                    >
                      {selectedService.status}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Slots Available
                    </h4>
                    <span
                      className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${getSlotColor(
                        selectedService.slotsAvailable
                      )}`}
                    >
                      {selectedService.slotsAvailable}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Service
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setViewDialogOpen(false)}
                    className="border-gray-300"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
