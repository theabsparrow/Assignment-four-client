import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type TMetaDataProps = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
type TPagninationProps = {
  meta: TMetaDataProps;
  handlePageChange: (page: number) => void;
};

const Pagination = ({ meta, handlePageChange }: TPagninationProps) => {
  const { page, totalPage } = meta;

  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 font-inter">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center gap-1 font-semibold 
          ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
        `}
      >
        <FaChevronLeft /> Prev
      </button>

      {/* Page Number Buttons */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold border
              ${
                page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPage}
        className={`px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center gap-1 font-semibold 
          ${
            page === totalPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
        `}
      >
        Next <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
