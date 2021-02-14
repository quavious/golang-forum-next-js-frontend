import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({currentPage, maxPage, handlePaginate}){
    const [wide, isWide] = useState(true)
    useEffect(() => {
        function findWidth(){
            const {innerWidth} = window
            if(innerWidth < 991 && wide) {
                isWide(false)
            } else if(innerWidth >= 991 && !wide) {
                isWide(true)
            }
        }
        window.addEventListener("resize", findWidth)
        return () => window.removeEventListener("resize", findWidth)
    }, [wide])
    return (
        <div className="d-flex justify-content-center w-100 mt-4">
            <ReactPaginate
                marginPagesDisplayed={wide ? 2 : 1}
                pageRangeDisplayed={wide ? 5 : 3}
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