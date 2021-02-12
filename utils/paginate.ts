import { NextRouter } from "next/router";

export default function handlePaginate(page: any, router: NextRouter){
    const path = router.pathname;
    const query = router.query;
    query.page = page.selected + 1;
    router.push({
        pathname: path,
        query: query,
    })
}