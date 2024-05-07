// import { auth } from '@/lib/auth'
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
            <li className="">
              <Link
                className={`flex flex-col items-center ${
                  "home" === activeItem
                    ? "text-green-700"
                    : "text-gray-800 opacity-90"
                }`}
                href="/home"
              >
                <span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-xs">Anasayfa</span>
              </Link>
            </li>
            <li className="">
              <Link
                className={`flex flex-col items-center ${
                  "info" === activeItem
                    ? "text-green-700"
                    : "text-gray-800 opacity-90"
                }`}
                href="/info"
              >
                <span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-xs">Bilgi</span>
              </Link>
            </li>
            <li className="">
              <Link
                className={`flex flex-col items-center ${
                  "recycle" === activeItem
                    ? "text-green-700"
                    : "text-gray-800 opacity-90"
                }`}
                href="/recycle"
              >
                <span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-xs">Dönüştür</span>
              </Link>
            </li>{" "}
            <li className="">
              <Link
                className={`flex flex-col items-center ${
                  "reward" === activeItem
                    ? "text-green-700"
                    : "text-gray-800 opacity-90"
                }`}
                href="/reward"
              >
                <span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 7h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C10.4 2.842 8.949 2 7.5 2A3.5 3.5 0 0 0 4 5.5c.003.52.123 1.033.351 1.5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2Zm-9.942 0H7.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z" />
                  </svg>
                </span>
                <span className="text-xs">Ödül</span>
              </Link>
            </li>
            <li className="">
              <Link
                className={`flex flex-col items-center ${
                  "appointment" === activeItem
                    ? "text-green-700"
                    : "text-gray-800 opacity-90"
                }`}
                href="/info/appointment"
              >
                <span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-xs">Randevu</span>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}

export default AppLayout
