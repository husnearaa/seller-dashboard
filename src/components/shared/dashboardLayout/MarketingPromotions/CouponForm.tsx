"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface CouponFormData {
  couponCode: string;
  discountType: string;
  discount: string;
  limitPerUser: string;
  minOrderAmount: string;
  maxDiscountAmount: string;
  startDate: string;
  startTime: string;
  expireDate: string;
  expireTime: string;
}

export default function CouponForm() {
  const { register, handleSubmit, setValue } = useForm<CouponFormData>({
    defaultValues: {
      couponCode: "",
      discountType: "Amount",
      discount: "",
      limitPerUser: "",
      minOrderAmount: "",
      maxDiscountAmount: "",
      startDate: "",
      startTime: "",
      expireDate: "",
      expireTime: "",
    },
  });

  const onSubmit = (data: CouponFormData) => {
    try {
      console.log("Form Data:", data);
      toast.success("Coupon saved successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save coupon!"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
    >
      {/* Left Column */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Coupon Code</label>
          <Input placeholder="#1322522" {...register("couponCode")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Discount</label>
          <Input placeholder="Discount" {...register("discount")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Limit For Single User
          </label>
          <Input placeholder="Limit" {...register("limitPerUser")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <Input type="date" {...register("startDate")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expire Date</label>
          <Input type="date" {...register("expireDate")} />
        </div>

        <div className="flex gap-3 mt-6">
          <Button type="submit" className="bg-black text-white">
            Save
          </Button>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Discount Type
          </label>
          <Select
            onValueChange={(val) => setValue("discountType", val)}
            defaultValue="Amount"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Amount">Amount</SelectItem>
              <SelectItem value="Percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Minimum Order Amount
          </label>
          <Input placeholder="Amount" {...register("minOrderAmount")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Maximum Discount Amount
          </label>
          <Input placeholder="Amount" {...register("maxDiscountAmount")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <Input type="time" {...register("startTime")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expire Time</label>
          <Input type="time" {...register("expireTime")} />
        </div>
      </div>
    </form>
  );
}
