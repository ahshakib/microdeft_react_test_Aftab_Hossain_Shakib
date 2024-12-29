// eslint-disable-next-line react/prop-types
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2 justify-center mt-5">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-slate-500 text-white p-2 rounded-md"
      >
        &laquo; Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`p-2 rounded-md ${
            currentPage === number ? "bg-slate-500 text-white" : "bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-slate-500 text-white p-2 rounded-md"
      >
        Next &raquo;
      </button>
    </div>
  );
}

export default Pagination;
