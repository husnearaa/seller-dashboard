import { CouponTable } from "./CouponTable";

export default function MarketingPromotion() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <div className="mb-2 text-sm text-muted-foreground">
          Dashboard {">"} Marketing & Promotions
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Marketing & Promotions
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-12 p-6">
        {/* Coupon Section */}
        <section>
          <CouponTable />
        </section>

        {/* Advertising Section */}
        <section>{/* <AdvertisingGrid /> */}</section>
      </div>
    </main>
  );
}
