import Image from "next/image";
import Logo from "@/assets/Logo.png";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Welcome Message */}
        <div className="flex flex-row items-start sm:items-center md:gap-3 gap-2 w-full sm:w-auto">
          <div className="h-12 w-12 rounded-full bg-blue-500 overflow-hidden ml-auto sm:ml-0">
            <Image
              src={Logo || "/placeholder.svg"}
              alt="Profile"
              width={500}
              height={300}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">welcome!</h1>
            <p className="text-gray-500">greeting</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-1">{children}</div>
      </main>
    </div>
  );
}
