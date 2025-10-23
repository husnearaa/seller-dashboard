"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { Cloud } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

interface SubscriptionFormData {
  subscriptionName: string;
  subscriptionPrice: string;
  subscriptionDescription: string;
  category: string;
  subscriptionLimit: string;
  planType: string[];
  benefits: string[];
  renewalType: string;
  subscriptionImage?: FileList;
}

export function AddSubscriptionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SubscriptionFormData>({
    defaultValues: {
      subscriptionName: "",
      subscriptionPrice: "",
      subscriptionDescription: "",
      category: "Personal Care & Wellness",
      subscriptionLimit: "",
      planType: [],
      benefits: [],
      renewalType: "Auto",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = (data: SubscriptionFormData) => {
    try {
      console.log("[v0] Subscription Data:", data);
      toast.success("Subscription saved successfully!", {
        description: "Your subscription has been added to the system.",
      });
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("[v0] Submission error:", error);
      toast.error("Failed to save subscription", {
        description: "Please check your input and try again.",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image too large", {
          description: "Image size must be less than 2 MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // For checkbox group handling
  const toggleSelection = (field: "planType" | "benefits", value: string) => {
    const current = watch(field) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, updated);
  };

  const planOptions = [
    "One Month",
    "3 Months",
    "6 Months",
    "1 Year",
    "2 Year",
  ];

  const benefitOptions = [
    "3 pack in one subscription",
    "Reduce 9.99$ from regular price",
    "Reduce 9.99$ from regular price",
    "Reduce 9.99$ from regular price",
    "Reduce 9.99$ from regular price",
  ];

  return (
    <section className="max-w-6xl mx-auto py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload */}
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 bg-blue-50 text-center">
          <label htmlFor="subscriptionImage" className="cursor-pointer">
            {imagePreview ? (
              <div className="space-y-2">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={500}
                  height={500}
                  className="w-32 h-32 object-cover mx-auto rounded"
                />
                <p className="text-sm text-muted-foreground">
                  Click to change image
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Cloud className="w-12 h-12 mx-auto text-gray-400" />
                <p className="font-medium">Upload your store Product Image</p>
                <p className="text-sm text-muted-foreground">
                  Image Size: Max 2 MB
                </p>
              </div>
            )}
          </label>
          <input
            id="subscriptionImage"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("subscriptionImage")}
            onChange={handleImageChange}
          />
        </div>

        {/* Name + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Subscription Name
            </label>
            <Input
              placeholder="Personal Styling Consultation"
              {...register("subscriptionName", {
                required: "Subscription name is required",
              })}
              className={errors.subscriptionName ? "border-red-500" : ""}
            />
            {errors.subscriptionName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subscriptionName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Subscription Price
            </label>
            <div className="flex gap-2">
              <div className="bg-blue-600 text-white rounded px-3 py-2 flex items-center font-semibold">
                $
              </div>
              <Input
                placeholder="123"
                type="number"
                {...register("subscriptionPrice", {
                  required: "Price is required",
                })}
                className={errors.subscriptionPrice ? "border-red-500" : ""}
              />
            </div>
            {errors.subscriptionPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subscriptionPrice.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Subscription Description
          </label>
          <Textarea
            placeholder="Enter subscription description"
            {...register("subscriptionDescription")}
            className="min-h-24"
          />
        </div>

        {/* Category + Limit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select
              defaultValue="Personal Care & Wellness"
              onValueChange={(v) => setValue("category", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Personal Care & Wellness">
                  Personal Care & Wellness
                </SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Home & Garden">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Subscription Limit
            </label>
            <Input
              placeholder="max 100 subscribers"
              {...register("subscriptionLimit")}
            />
          </div>
        </div>

        {/* Plan Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Plan Type</label>
          <div className="border rounded-lg p-4 space-y-2">
            {planOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  checked={watch("planType")?.includes(option)}
                  onCheckedChange={() => toggleSelection("planType", option)}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Benefits Included
          </label>
          <div className="border rounded-lg p-4 space-y-2">
            {benefitOptions.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Checkbox
                  checked={watch("benefits")?.includes(option)}
                  onCheckedChange={() => toggleSelection("benefits", option)}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Renewal Type</label>
          <Select
            defaultValue="Auto"
            onValueChange={(v) => setValue("renewalType", v)}
          >
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Auto">Auto</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
            </SelectContent>
          </Select>
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
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
