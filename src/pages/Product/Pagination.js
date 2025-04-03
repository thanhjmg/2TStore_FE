import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null; // 🔹 Không hiển thị nếu chỉ có 1 trang

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
