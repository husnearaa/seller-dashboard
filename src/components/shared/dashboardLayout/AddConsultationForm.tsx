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

interface ConsultationFormData {
  consultationName: string
  consultationPrice: string
  consultationDescription: string
  category: string
  consultationDuration: string
  title: string
  consultationTime: string
  experience: string
  type: string
  consultantImage?: FileList
}

export function AddConsultationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    defaultValues: {
      consultationName: "",
      consultationPrice: "",
      consultationDescription: "",
      category: "Personal Care & Wellness",
      consultationDuration: "30 min",
      title: "",
      consultationTime: "Sat - Fri (10 AM 11 PM)",
      experience: "",
      type: "Online",
    },
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const onSubmit = (data: ConsultationFormData) => {
    try {
      console.log("[v0] Consultation Form Data Submitted:", data)
      console.log("[v0] Image File:", data.consultantImage?.[0])

      toast.success("Consultation saved successfully!", {
        description: "Your consultation has been added to the system.",
      })

      reset()
      setImagePreview(null)
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      toast.error("Failed to save consultation", {
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
          <label htmlFor="consultantImage" className="cursor-pointer">
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
                <p className="font-medium">Upload Consultant Image</p>
                <p className="text-sm text-muted-foreground">Image Size: Max 2 MB</p>
              </div>
            )}
          </label>
          <input
            id="consultantImage"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("consultantImage")}
            onChange={handleImageChange}
          />
        </div>

        {/* Consultation Name and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Consultation Name</label>
            <Input
              placeholder="Personal Styling Consultation"
              {...register("consultationName", {
                required: "Consultation name is required",
              })}
              className={errors.consultationName ? "border-red-500" : ""}
            />
            {errors.consultationName && <p className="text-red-500 text-sm mt-1">{errors.consultationName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Consultation Price</label>
            <div className="flex gap-2">
              <div className="bg-blue-600 text-white rounded px-3 py-2 flex items-center font-semibold">$</div>
              <Input
                placeholder="123"
                type="number"
                {...register("consultationPrice", {
                  required: "Price is required",
                })}
                className={errors.consultationPrice ? "border-red-500" : ""}
              />
            </div>
            {errors.consultationPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.consultationPrice.message}</p>
            )}
          </div>
        </div>

        {/* Consultation Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Consultation Description</label>
          <Textarea
            placeholder="Enter consultation description"
            {...register("consultationDescription", {
              required: "Description is required",
            })}
            className={`min-h-24 ${errors.consultationDescription ? "border-red-500" : ""}`}
          />
          {errors.consultationDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.consultationDescription.message}</p>
          )}
        </div>

        {/* Category and Consultation Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select defaultValue="Personal Care & Wellness">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Personal Care & Wellness">Personal Care & Wellness</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Consultation Duration</label>
            <Input placeholder="30 min" {...register("consultationDuration")} />
          </div>
        </div>

        {/* Title and Consultation Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              placeholder="Economist"
              {...register("title", { required: "Title is required" })}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Consultation Time</label>
            <Input placeholder="Sat - Fri (10 AM 11 PM)" {...register("consultationTime")} />
          </div>
        </div>

        {/* Experience and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Experience</label>
            <Input placeholder="Years of experience" {...register("experience")} />
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
