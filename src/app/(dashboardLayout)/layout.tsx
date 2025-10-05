import type React from "react"
import { DashboardLayout } from "@/components/shared/dashboardLayout/DashboardLayoput"

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
