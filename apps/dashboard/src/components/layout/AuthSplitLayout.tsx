import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { UtensilsCrossed } from "lucide-react"

interface AuthSplitLayoutProps {
  children: React.ReactNode
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: string
}

const AuthSplitLayout = ({
  children,
  imageSrc,
  imageAlt,
  title,
  subtitle,
}: AuthSplitLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Column: Visual & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-navy flex-col justify-between p-16 overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-[28px] text-white">PLO</span>
            <span className="font-bold text-[28px] text-action">KITCH</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold text-white/60 ml-2 uppercase tracking-widest">Admin</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-[42px] font-bold text-white leading-[1.15] mb-6">
            {title}
          </h1>
          <p className="text-[16px] text-white/60 leading-relaxed mb-10">
            {subtitle}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <UtensilsCrossed size={18} className="text-action" />
              </div>
              <p className="text-body font-medium text-white/80">Real-time dispatch monitor with live order tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <UtensilsCrossed size={18} className="text-action" />
              </div>
              <p className="text-body font-medium text-white/80">Vendor pipeline, payouts, and performance management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <UtensilsCrossed size={18} className="text-action" />
              </div>
              <p className="text-body font-medium text-white/80">Rider network operations and automated dispatching</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[12px] text-white/30 font-medium">
            Plokitch - Built by Plokitch Digital Ltd
          </p>
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#001433] to-navy" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] scale-[3]">
          <UtensilsCrossed size={300} className="text-white" />
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-beige">
        <div className="w-full max-w-[440px] flex flex-col gap-8 bg-white p-10 rounded-card shadow-card border border-divider">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-[24px] text-navy">PLO</span>
              <span className="font-bold text-[24px] text-action">KITCH</span>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

export { AuthSplitLayout }
