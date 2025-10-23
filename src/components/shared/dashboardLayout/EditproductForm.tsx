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
import { useState, useEffect } from "react";
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

interface EditProductFormProps {
  productId: string;
  initialData?: Partial<ProductFormData> & { existingImageUrl?: string };
  onCancel?: () => void;
}

export function EditProductForm({ productId, initialData, onCancel }: EditProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
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
      ...initialData,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.existingImageUrl || null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Load product data when component mounts or productId changes
  useEffect(() => {
    if (initialData) {
      // Reset form with initial data
      reset({
        productName: initialData.productName || "",
        productPrice: initialData.productPrice || "",
        productDescription: initialData.productDescription || "",
        category: initialData.category || "Personal Care & Wellness",
        subCategory: initialData.subCategory || "Personal Care & Wellness",
        type: initialData.type || "Top Deal",
        stockQuantity: initialData.stockQuantity || "",
        discount: initialData.discount || "",
        barcode: initialData.barcode || "",
        tags: initialData.tags || "",
        aboutProduct: initialData.aboutProduct || "",
      });
      
      if (initialData.existingImageUrl) {
        setImagePreview(initialData.existingImageUrl);
      }
    }
  }, [initialData, reset, productId]);

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      console.log("[v0] Editing Product ID:", productId);
      console.log("[v0] Form Data Submitted:", data);
      console.log("[v0] Image File:", data.productImage?.[0]);
      console.log("[v0] Changes Made:", isDirty);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Product updated successfully!", {
        description: "Your product changes have been saved.",
      });

      // In a real app, you might want to navigate back or call a callback
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error);
      toast.error("Failed to update product", {
        description: "Please check your input and try again.",
      });
    } finally {
      setIsLoading(false);
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

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Fallback behavior
      reset();
      setImagePreview(initialData?.existingImageUrl || null);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600">Update product details for {productId}</p>
      </div>

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
                <p className="font-medium">Update product image</p>
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
          {initialData?.existingImageUrl && !imagePreview?.startsWith('data:') && (
            <p className="text-xs text-gray-500 mt-2">
              Current image will be kept unless changed
            </p>
          )}
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
            <Select 
              defaultValue={initialData?.category || "Personal Care & Wellness"}
              onValueChange={(value) => setValue("category", value)}
            >
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
            <Select 
              defaultValue={initialData?.subCategory || "Personal Care & Wellness"}
              onValueChange={(value) => setValue("subCategory", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
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
            <Select 
              defaultValue={initialData?.type || "Top Deal"}
              onValueChange={(value) => setValue("type", value)}
            >
              <SelectTrigger className="w-full h-12 px-4 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
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
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Product"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}