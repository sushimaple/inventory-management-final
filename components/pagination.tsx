import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  SearchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = 

  return (
    <nav className="flex items-center justify-center gap-1">
      <Link
        href=""
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
          currentPage <= 1
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft />
        Previous
      </Link>
      <Link
        href=""
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
          currentPage >= totalPages
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
        <ChevronRight />
      </Link>
    </nav>
  );
}
