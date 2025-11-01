"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Search, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AdvImg from "@/assets/images/advert.png";
import { CustomPagination } from "../../CustomPagination";

interface AdCard {
  id: string;
  title: string;
  image: string;
  timeline: string;
  deadline: string;
  status: string;
}

const mockAds: AdCard[] = [
  {
    id: "ad-1",
    title: "Ads Camping",
    timeline: "60 Sec",
    deadline: "1 Day: 2hr : 00Minute : 00Sec",
    image: AdvImg.src,
    status: "active",
  },
  {
    id: "ad-2",
    title: "Ads Camping",
    timeline: "60 Sec",
    deadline: "1 Day: 2hr : 00Minute : 00Sec",
    image: AdvImg.src,
    status: "active",
  },
  {
    id: "ad-3",
    title: "Ads Camping",
    timeline: "60 Sec",
    deadline: "1 Day: 2hr : 00Minute : 00Sec",
    image: AdvImg.src,
    status: "active",
  },
  {
    id: "ad-4",
    title: "Ads Camping",
    timeline: "60 Sec",
    deadline: "1 Day: 2hr : 00Minute : 00Sec",
    image: AdvImg.src,
    status: "active",
  },
  {
    id: "ad-5",
    title: "Ads Camping",
    timeline: "60 Sec",
    deadline: "1 Day: 2hr : 00Minute : 00Sec",
    image: AdvImg.src,
    status: "active",
  },
  {
    id: "ad-6",
    title: "Ads Camping",
    timeline: "60 Sec",
    deadline: "1 Day: 2hr : 00Minute : 00Sec",
    image: AdvImg.src,
    status: "active",
  },
  {
    id: "ad-7",
    title: "Ads Camping",
    timeline: "60 Sec",
    deadline: "1 Day: 2hr : 00Minute : 00Sec",
    image: AdvImg.src,
    status: "active",
  },
  {
    id: "ad-8",
    title: "Ads Camping",
    timeline: "60 Sec",
    deadline: "1 Day: 2hr : 00Minute : 00Sec",
    image: AdvImg.src,
    status: "active",
  },
];

export function AdvertisingGrid() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [stopDialogOpen, setStopDialogOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = mockAds.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockAds.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (adId: string) => {
    setSelectedAd(adId);
    setDeleteDialogOpen(true);
    setOpenDropdown(null);
  };

  const handleStop = (adId: string) => {
    setSelectedAd(adId);
    setStopDialogOpen(true);
    setOpenDropdown(null);
  };

  const confirmDelete = () => {
    console.log("Deleting ad:", selectedAd);
    setDeleteDialogOpen(false);
    setSelectedAd(null);
  };

  const confirmStop = () => {
    console.log("Stopping ad:", selectedAd);
    setStopDialogOpen(false);
    setSelectedAd(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Advertising List
        </h2>
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

      {currentItems.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No advertisements found</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((ad) => (
              <div
                key={ad.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative">
                  {/* Status indicator */}
                  <div
                    className={`absolute top-10 right-10 w-6 h-6 rounded-full z-10 ${
                      ad.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>

                  {/* Ad Image */}
                  <div className="lg:p-6 p-3">
                    <Image
                      src={ad.image}
                      alt={ad.title}
                      width={327}
                      height={450}
                      className="object-cover h-[450px] w-[327px] rounded-lg"
                      onError={(e) => {
                        // Fallback to placeholder image if the URL fails to load
                        (e.target as HTMLImageElement).src = AdvImg.src;
                      }}
                    />
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Ad Title and Menu */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{ad.title}</h3>
                    <DropdownMenu
                      open={openDropdown === ad.id}
                      onOpenChange={(open) =>
                        setOpenDropdown(open ? ad.id : null)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link
                          href={`/admin/advertising/edit-advertise/${ad.id}`}
                        >
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDelete(ad.id)}>
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStop(ad.id)}>
                          Stop
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Ad Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">TimeLine</span>
                      <span className="text-gray-900">{ad.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline</span>
                      <span className="text-red-500 font-medium">
                        {ad.deadline}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span
                        className={`font-medium ${
                          ad.status === "active"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>

          <div className="">
            <CustomPagination
              totalItems={totalItems}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this ad?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={stopDialogOpen} onOpenChange={setStopDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-medium text-gray-900">
              Are you sure you want to stop this ad?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setStopDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmStop}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Stop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
