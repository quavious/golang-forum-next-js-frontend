import ReactPaginate from "react-paginate";

export default function Pagination({currentPage, maxPage, handlePaginate}){
    return (
        <div className="d-flex justify-content-center w-100 mt-4">
            <ReactPaginate
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                initialPage={currentPage - 1}
                pageCount={maxPage}
                onPageChange={handlePaginate}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                disabledClassName="disabled"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
      </div>
    )
}