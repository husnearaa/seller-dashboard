"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cloud } from "lucide-react";

interface ServiceFormData {
  serviceName: string;
  servicePrice: string;
  serviceDescription: string;
  category: string;
  duration: string;
  totalSlot: string;
  availableSlot: string;
  location: string;
  tags: string;
  startTime: string;
  endTime: string;
  serviceType: string[];
  specialists: string[];
  serviceImage?: FileList;
}

const specialistsList = [
  { id: 1, name: "Ella", role: "Stylist", image: "/placeholder.svg" },
  { id: 2, name: "JAMES", role: "Stylist", image: "/placeholder.svg" },
  { id: 3, name: "Jenny", role: "Stylist", image: "/placeholder.svg" },
  { id: 4, name: "Ella", role: "Stylist", image: "/placeholder.svg" },
  { id: 5, name: "Leo", role: "Stylist", image: "/placeholder.svg" },
  { id: 6, name: "Ella", role: "Stylist", image: "/placeholder.svg" },
  { id: 7, name: "JAMES", role: "Stylist", image: "/placeholder.svg" },
  { id: 8, name: "Ella", role: "Stylist", image: "/placeholder.svg" },
  { id: 9, name: "Jenny", role: "Stylist", image: "/placeholder.svg" },
  { id: 10, name: "Jenny", role: "Stylist", image: "/placeholder.svg" },
];

export function AddServiceForm() {
  const { register, handleSubmit, reset } = useForm<ServiceFormData>({
    defaultValues: {
      category: "Personal Care & Wellness",
      duration: "30 min",
      serviceType: [],
      specialists: [],
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedSpecialists, setSelectedSpecialists] = useState<number[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image too large", { description: "Max size 2 MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleSpecialist = (id: number) => {
    setSelectedSpecialists((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onSubmit = (data: ServiceFormData) => {
    console.log("Service Data:", data);
    toast.success("Service added successfully!");
    reset();
    setImagePreview(null);
    setSelectedSpecialists([]);
  };

  return (
    <section className="max-w-6xl mx-auto py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload */}
        <div>
          <p className="text-sm font-medium mb-2">Upload Service Image</p>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 bg-blue-50 text-center">
            <label htmlFor="serviceImage" className="cursor-pointer">
              {imagePreview ? (
                <div className="space-y-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={500}
                    height={500}
                    className="w-32 h-32 object-cover mx-auto rounded"
                  />
                  <p className="text-sm text-gray-500">
                    Click to change image
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Cloud className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="font-medium">Upload your store Product Image</p>
                  <p className="text-sm text-gray-500">Image Size: Max 2 MB</p>
                </div>
              )}
            </label>
            <input
              id="serviceImage"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("serviceImage")}
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Service Name + Price */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Service Name
            </label>
            <Input placeholder="Relaxing Full Body Massage" {...register("serviceName")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Service Price
            </label>
            <div className="flex gap-2">
              <div className="bg-blue-600 text-white rounded px-3 py-2 flex items-center font-semibold">
                $
              </div>
              <Input placeholder="123" type="number" {...register("servicePrice")} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Service Description
          </label>
          <Textarea placeholder="Enter service description" {...register("serviceDescription")} />
        </div>

        {/* Category + Duration */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select defaultValue="Personal Care & Wellness">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal Care & Wellness">
                  Personal Care & Wellness
                </SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Service Duration
            </label>
            <Select defaultValue="30 min">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15 min">15 min</SelectItem>
                <SelectItem value="30 min">30 min</SelectItem>
                <SelectItem value="1 hour">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Slots, Location, Tags, Time */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input placeholder="Total slot" {...register("totalSlot")} />
          <Input placeholder="Available slot" {...register("availableSlot")} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input placeholder="Location" {...register("location")} />
          <Input placeholder="Tags" {...register("tags")} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input placeholder="Start Time" {...register("startTime")} />
          <Input placeholder="End Time" {...register("endTime")} />
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Service Type</label>
          <div className="flex flex-col space-y-2">
            {[
              "Men's Hair Service",
              "Women's Hair Service",
              "Unfurl Keratin",
              "Dool Luxury Treatment",
            ].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input type="checkbox" value={type} {...register("serviceType")} />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Specialists */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Assign Specialist
          </label>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {specialistsList.map((person) => (
              <div
                key={person.id}
                onClick={() => toggleSpecialist(person.id)}
                className={`cursor-pointer border rounded-xl p-4 text-center transition ${
                  selectedSpecialists.includes(person.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 mx-auto rounded-full object-cover mb-2"
                />
                <p className="font-medium">{person.name}</p>
                <p className="text-sm text-gray-500">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white px-8"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setImagePreview(null);
              setSelectedSpecialists([]);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
