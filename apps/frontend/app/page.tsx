import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Image
            src="https://i.pinimg.com/736x/f7/2f/18/f72f18067b09f0c0d40172346ff0edd2.jpg"
            alt="CollabCanvas Logo"
            className="rounded-xl"
            width={45}
            height={45}
          />
          <span className="text-xl font-bold">CollabCanvas</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="#features"
                className="text-gray-600 hover:text-gray-900"
              >
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Docs
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="py-20 text-center">
          <h1 className="text-5xl text-[#a8a5ff] font-bold mb-4">
            Collaborate in Real-Time with CollabCanvas
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create, share, and edit diagrams together, instantly.
          </p>
          <Link href={"/signup"}>
            <Button className="bg-[#a8a5ff] hover:bg-[#9b97fb]" size="lg">
              Try CollabCanvas Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl text-[#a8a5ff] font-bold text-center mb-12">
              Why Choose CollabCanvas?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#a8a5ff] text-primary-foreground rounded-full p-3 inline-block mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Real-Time Collaboration
                </h3>
                <p className="text-gray-600">
                  Work together seamlessly with your team, no matter where they
                  are.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#a8a5ff] text-primary-foreground rounded-full p-3 inline-block mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Intuitive Interface
                </h3>
                <p className="text-gray-600">
                  Easy-to-use tools that make diagramming a breeze for everyone.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#a8a5ff] text-primary-foreground rounded-full p-3 inline-block mb-4">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600">
                  Your data is encrypted and protected. You're in control.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <h2 className="text-3xl text-[#a8a5ff] font-bold mb-4">
            Ready to Start Collaborating?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of teams already using CollabCanvas.
          </p>
          <Button size="lg" variant="outline" className="mr-4">
            Learn More
          </Button>
          <Link href={"/signup"}>
            <Button className="bg-[#a8a5ff] hover:bg-[#8a86fc]" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Use Cases
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2025 CollabCanvas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
