"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ArrowRight, Mail, User, Lock } from "lucide-react"
import { toast } from "sonner"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const SignUpPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData.entries())

      await axios.post(`${BACKEND_URL}/user/signup`, data)

      router.push("/login")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src="https://i.pinimg.com/736x/6c/5d/48/6c5d48670be6c9e3d3ebc59e688c4770.jpg"
            alt="Collaborative drawing"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to CollabCanvas</h1>
            <p className="text-xl text-center max-w-md">
              Join our community of creators and collaborate in real-time on amazing projects!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image
              src="https://i.pinimg.com/736x/f7/2f/18/f72f18067b09f0c0d40172346ff0edd2.jpg"
              alt="CollabCanvas Logo"
              width={60}
              height={60}
              className="mx-auto mb-4 rounded-xl"
            />
            <h2 className="text-3xl font-bold text-gray-800">Create your account</h2>
            <p className="text-gray-600 mt-2">Start your journey with CollabCanvas today</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-[#a8a5ff] text-white py-2 rounded-lg hover:bg-[#8d8afc] transition duration-300 flex items-center justify-center ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
              {!isLoading && <ArrowRight className="ml-2" size={20} />}
            </button>
          </form>
          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

