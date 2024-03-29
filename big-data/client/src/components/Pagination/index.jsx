import './pagination.scss'
import PropTypes from 'prop-types';


export const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className=" paginationBtn"
            >
                <span className="sr-only">Prev Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <p className="currentPage">
                {currentPage}
                <span className="mx-0.25">/</span>
                {totalPages}
            </p>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                className='paginationBtn'
            >
                <span className="sr-only">Next Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};