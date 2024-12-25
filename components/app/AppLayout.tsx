// import { auth } from '@/lib/auth'
import { Home, Focus, MessageSquareMore } from "lucide-react"
import Link from "next/link"
import Header from "./Header"

const AppLayout = async ({
  activeItem = "dashboard",
  children,
}: {
  activeItem: string
  children: React.ReactNode
}) => {
  return (
    <>
      <main className="flex min-h-screen w-screen overflow-hidden flex-col text-gray-800">
        <Header />
        <div className="items-center justify-between">{children}</div>

        <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-none z-20">
          <ul className="menu w-full mx-auto flex flex-row justify-between px-3 py-3 bg-white shadow-lg shadow-top">
            <li className="flex-1">
              <Link
                className={`flex flex-col items-center ${
                  "home" === activeItem
                    ? "text-green-700"
                    : "text-gray-800 opacity-90"
                }`}
                href="/home"
              >
                <span className="mb-1">
                  <Home className="w-6 h-6" />
                </span>
                <span className="text-xs">Home</span>
              </Link>
            </li>
            <li className="flex-1">
              <Link
                className={`flex flex-col items-center ${
                  "scan" === activeItem
                    ? "text-green-700"
                    : "text-gray-800 opacity-90"
                }`}
                href="/scan"
              >
                <span className="mb-1">
                  <Focus className="w-6 h-6" />
                </span>
                <span className="text-xs">Scan</span>
              </Link>
            </li>{" "}
            <li className="flex-1">
              <Link
                className={`flex flex-col items-center ${
                  "advisor" === activeItem
                    ? "text-green-700"
                    : "text-gray-800 opacity-90"
                }`}
                href="/advisor"
              >
                <span className="mb-1">
                  <MessageSquareMore className="w-6 h-6" />
                </span>
                <span className="text-xs">Advisor</span>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}

export default AppLayout
