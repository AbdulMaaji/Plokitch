"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronRight, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"
import { AuthSplitLayout } from "@/components/layout/AuthSplitLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema, LoginFormValues } from "@/lib/validations"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError("")
    
    try {
      const result = await signIn("credentials", {
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid admin key. Please try again.")
        setIsLoading(false)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (e) {
      setError("An unexpected error occurred.")
      setIsLoading(false)
    }
  }

  return (
    <AuthSplitLayout
      imageSrc=""
      imageAlt=""
      title="The control room for Plokitch."
      subtitle="Monitor vendor performance, rider dispatch activity, and customer analytics — all in one centralized operations console."
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full w-fit">
          <Lock size={14} />
          <span className="text-[11px] font-bold uppercase tracking-wider">Admin Access</span>
        </div>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-bold text-navy">Sign in to Plokitch Admin</h2>
          <p className="text-body text-subtle">Enter your admin dashboard key to continue.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-[13px] font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-caption font-bold text-navy uppercase">Admin key</label>
          <div className="relative">
            <Input 
              {...register("password")}
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••••••••••" 
              className="pr-12 h-14 bg-blue-50/50 border-blue-100 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-placeholder hover:text-navy transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-destructive text-[12px] font-medium">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full h-14 bg-action hover:bg-action/90 text-white font-bold text-nav" disabled={isLoading}>
          {isLoading ? "AUTHENTICATING..." : "SIGN IN"} 
          {!isLoading && <ChevronRight size={18} className="ml-1" />}
        </Button>
      </form>

      <div className="text-center pt-4">
        <p className="text-caption text-subtle">
          Customer login is at <Link href="#" className="font-bold text-navy hover:text-action transition-colors">/login</Link>.
        </p>
      </div>
    </AuthSplitLayout>
  )
}
