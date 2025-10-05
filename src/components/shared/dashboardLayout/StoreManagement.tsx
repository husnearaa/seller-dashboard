import Image from "next/image"
import { MapPin, Phone, Mail, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductImage from "@/assets/images/Product1.png"

export default function StoreManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64">
        <Image
          src={ProductImage}   
          alt="Store banner showing clothing collection"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <h2 className="text-xl font-semibold text-gray-900">hankok tailor</h2>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        {/* Store Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              {/* Store Logo */}
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex-shrink-0 overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="50" fill="#22c55e" />
                  <path
                    d="M30 40 L35 60 L40 50 L45 70 L50 45 L55 65 L60 50 L65 60 L70 40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                  />
                  <circle cx="35" cy="35" r="8" fill="#eab308" />
                  <circle cx="65" cy="35" r="8" fill="#3b82f6" />
                  <path d="M40 70 Q50 80 60 70" fill="none" stroke="#f97316" strokeWidth="3" />
                </svg>
              </div>

              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Hankook Trail store</h1>
                <p className="text-sm text-gray-500">Shop ID: 1412434</p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <span className="text-sm">Edit</span>
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          {/* Address */}
          <div className="flex gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              SECOND FLOOR, 8TH ASEAH AVENUE, BUILDING ASEANA CITY, Parañaque, 1702 Metro Manila, ASEANA Parañaque, 1702
              Metro Manila, Parañaque, Metro Manila
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Description:</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sapien facilisi consectetur nulla et pulvinar facilisis eu ultrices
            felis. Amet blandit dolor ac nibh quis. Magna tortor adipiscing est euismod sed ut proin bibendum
            sollicitudin augue. Donec urna porta eget ut et enim tortor bibendum. Semper est cursus in eleifum diam
            laceret vulputate. Morbi aliquet amet auctor auctor eu odio lorem vel. Ipsum lorem facilisis in volutpat.
            Rutrum urna ac velit lorem consequat placerat vel. Mauris velit enim nibh nisi tellus integer vitae.
          </p>
        </div>

        {/* Active Feature Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Feature:</h2>
          <div className="space-y-3">
            {/* Sell Product */}
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Sell Product</span>
            </div>

            {/* Provide Service */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Provide Service</span>
            </div>

            {/* Provide Consultation */}
            <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Provide Consultation</span>
            </div>

            {/* Sell Subscription */}
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Sell Subscription</span>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information:</h2>
          <div className="space-y-3">
            {/* Phone Number */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">0858993458</p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                <p className="text-sm font-medium text-gray-900">example123@gmail.com</p>
              </div>
            </div>

            {/* Facebook */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Facebook</p>
                <p className="text-sm font-medium text-gray-900">https://facebook.com</p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3 p-4 bg-pink-50 border border-pink-100 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Instagram</p>
                <p className="text-sm font-medium text-gray-900">https://instagram.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
