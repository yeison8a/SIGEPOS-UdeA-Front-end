"use client";

export default function Header() {
  return (
    <header className="w-[calc(100%-16rem)] bg-green-800 h-16 flex items-center p-4 fixed top-0 left-64 z-50">
      {/* Contenedor del breadcrumb */}
      <ol className="flex items-center whitespace-nowrap overflow-x-auto">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="flex items-center text-sm text-gray-100 hover:text-white focus:outline-hidden focus:text-white"
          >
            <svg
              className="shrink-0 me-3 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </a>
          <svg
            className="shrink-0 mx-2 size-4 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </li>

        <li className="inline-flex items-center">
          <a
            href="#"
            className="flex items-center text-sm text-gray-100 hover:text-white focus:outline-hidden focus:text-white"
          >
            <svg
              className="shrink-0 me-3 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="7" x="14" y="3" rx="1"></rect>
              <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
            </svg>
            App Center
          </a>
          <svg
            className="shrink-0 mx-2 size-4 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </li>

        <li
          className="inline-flex items-center text-sm font-semibold text-white truncate"
          aria-current="page"
        >
          Application
        </li>
      </ol>
    </header>
  );
}
