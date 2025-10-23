"use client";

import type React from "react";

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
import { useState } from "react";
import Image from "next/image";

interface ProductFormData {
  productName: string;
  productPrice: string;
  productDescription: string;
  category: string;
  subCategory: string;
  type: string;
  stockQuantity: string;
  discount: string;
  barcode: string;
  tags: string;
  aboutProduct: string;
  productImage?: FileList;
}

export function AddProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
      category: "Personal Care & Wellness",
      subCategory: "Personal Care & Wellness",
      type: "Top Deal",
      stockQuantity: "",
      discount: "",
      barcode: "",
      tags: "",
      aboutProduct: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = (data: ProductFormData) => {
    try {
      console.log("[v0] Form Data Submitted:", data);
      console.log("[v0] Image File:", data.productImage?.[0]);

      toast.success("Product saved successfully!", {
        description: "Your product has been added to the system.",
      });

      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("[v0] Form submission error:", error);
      toast.error("Failed to save product", {
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
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Section */}
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 bg-blue-50 text-center">
          <label htmlFor="productImage" className="cursor-pointer">
            {imagePreview ? (
              <div className="space-y-2">
                <Image
                  src={imagePreview || "/placeholder.svg"}
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
            id="productImage"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("productImage")}
            onChange={handleImageChange}
          />
        </div>

        {/* Product Name and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <Input
              placeholder="Organic Hair Oil"
              {...register("productName", {
                required: "Product name is required",
              })}
              className={errors.productName ? "border-red-500" : ""}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Price
            </label>
            <div className="flex gap-2">
              <div className="bg-blue-600 text-white rounded px-3 py-2 flex items-center font-semibold">
                $
              </div>
              <Input
                placeholder="123"
                type="number"
                {...register("productPrice", { required: "Price is required" })}
                className={errors.productPrice ? "border-red-500" : ""}
              />
            </div>
            {errors.productPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productPrice.message}
              </p>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Description
          </label>
          <Textarea
            placeholder="Enter product description"
            {...register("productDescription", {
              required: "Description is required",
            })}
            className={`min-h-24 ${
              errors.productDescription ? "border-red-500" : ""
            }`}
          />
          {errors.productDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productDescription.message}
            </p>
          )}
        </div>

        {/* Category and Sub Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select defaultValue="Personal Care & Wellness">
              <SelectTrigger className="w-full">
                <SelectValue />
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
              Sub Category
            </label>
            <Select defaultValue="Personal Care & Wellness">
              <SelectTrigger  className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent  className="w-full">
                <SelectItem value="Personal Care & Wellness">
                  Personal Care & Wellness
                </SelectItem>
                <SelectItem value="Hair Care">Hair Care</SelectItem>
                <SelectItem value="Skin Care">Skin Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Type, Stock Quantity, and Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <Select defaultValue="Top Deal">
              <SelectTrigger  className="w-full h-12 px-4 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent  className="w-full">
                <SelectItem value="Top Deal">Top Deal</SelectItem>
                <SelectItem value="New Arrival">New Arrival</SelectItem>
                <SelectItem value="Best Seller">Best Seller</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Stock Quantity
            </label>
            <Input
              placeholder="25"
              type="number"
              {...register("stockQuantity")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Discount</label>
            <Input placeholder="10%" {...register("discount")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Barcode</label>
            <Input placeholder="PROD-1045" {...register("barcode")} />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <Input
            placeholder="organic, natural, hair care"
            {...register("tags")}
          />
        </div>

        {/* About this product */}
        <div>
          <label className="block text-sm font-medium mb-2">
            About this product
          </label>
          <Textarea
            placeholder="Enter additional product information"
            {...register("aboutProduct")}
            className="min-h-24"
          />
        </div>

        {/* Action Buttons */}
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
