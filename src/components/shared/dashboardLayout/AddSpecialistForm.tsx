"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cloud } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface SpecialistFormData {
  specialistName: string
  specialistPrice: string
  specialistDescription: string
  category: string
  title: string
  experience: string
  specialistDuration: string
  specialistTime: string
  type: string
  specialistImage?: FileList
}

export function AddSpecialistForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpecialistFormData>({
    defaultValues: {
      specialistName: "",
      specialistPrice: "",
      specialistDescription: "",
      category: "Personal Care & Wellness",
      title: "",
      experience: "",
      specialistDuration: "30 min",
      specialistTime: "Sat - Fri (10 AM - 11 PM)",
      type: "Online",
    },
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const onSubmit = (data: SpecialistFormData) => {
    try {
      console.log("[v0] Form Data Submitted:", data)
      console.log("[v0] Image File:", data.specialistImage?.[0])

      toast.success("Specialist saved successfully!", {
        description: "Your specialist has been added to the system.",
      })

      reset()
      setImagePreview(null)
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      toast.error("Failed to save specialist", {
        description: "Please check your input and try again.",
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image too large", {
          description: "Image size must be less than 2 MB.",
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="max-w-6xl mx-auto py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Section */}
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 bg-blue-50 text-center">
          <label htmlFor="specialistImage" className="cursor-pointer">
            {imagePreview ? (
              <div className="space-y-2">
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  width={500}
                  height={500}
                  className="w-32 h-32 object-cover mx-auto rounded"
                />
                <p className="text-sm text-muted-foreground">Click to change image</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Cloud className="w-12 h-12 mx-auto text-gray-400" />
                <p className="font-medium">Upload Specialist Image</p>
                <p className="text-sm text-muted-foreground">Image Size: Max 2 MB</p>
              </div>
            )}
          </label>
          <input
            id="specialistImage"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("specialistImage")}
            onChange={handleImageChange}
          />
        </div>

        {/* Specialist Name and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Specialist Name</label>
            <Input
              placeholder="Personal Styling Consultation"
              {...register("specialistName", {
                required: "Specialist name is required",
              })}
              className={errors.specialistName ? "border-red-500" : ""}
            />
            {errors.specialistName && <p className="text-red-500 text-sm mt-1">{errors.specialistName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Specialist Price</label>
            <div className="flex gap-2">
              <div className="bg-blue-600 text-white rounded px-3 py-2 flex items-center font-semibold">$</div>
              <Input
                placeholder="123"
                type="number"
                {...register("specialistPrice", { required: "Price is required" })}
                className={errors.specialistPrice ? "border-red-500" : ""}
              />
            </div>
            {errors.specialistPrice && <p className="text-red-500 text-sm mt-1">{errors.specialistPrice.message}</p>}
          </div>
        </div>

        {/* Specialist Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Specialist Description</label>
          <Textarea
            placeholder="Enter specialist description"
            {...register("specialistDescription", {
              required: "Description is required",
            })}
            className={`min-h-24 ${errors.specialistDescription ? "border-red-500" : ""}`}
          />
          {errors.specialistDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.specialistDescription.message}</p>
          )}
        </div>

        {/* Category and Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select defaultValue="Personal Care & Wellness">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Personal Care & Wellness">Personal Care & Wellness</SelectItem>
                <SelectItem value="Beauty">Beauty</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input placeholder="Consultant" {...register("title")} />
          </div>
        </div>

        {/* Experience and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Experience</label>
            <Input placeholder="10+ years" {...register("experience")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Specialist Duration</label>
            <Input placeholder="30 min" {...register("specialistDuration")} />
          </div>
        </div>

        {/* Specialist Time and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Specialist Time</label>
            <Input placeholder="Sat - Fri (10 AM - 11 PM)" {...register("specialistTime")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <Select defaultValue="Online">
              <SelectTrigger className="w-full h-12 px-4 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="In-Person">In-Person</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white px-8">
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset()
              setImagePreview(null)
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  )
}
