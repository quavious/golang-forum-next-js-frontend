import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import {useRouter} from 'next/router'
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap'
import Pagination from '../../component/pagination'
import ListProducts from '../../component/list/products'
import handlePaginate from '../../utils/paginate'

export const getServerSideProps:GetServerSideProps = async({query}) => {
    const page = query.page || 1;
    const param = query.keyword

    if(typeof param !== "string" || decodeURIComponent(param).length < 2) {
        throw new Error("Search Parameter Invalid")
    }
    let postData = null;

    try {
        const resp = await axios.get(`http://${process.env.API_HOST}/product/search/${param}/${page}`);
        postData = {response: await resp.data};
    } catch (err) {
        console.error(err);
        postData = {response: null};
    }
    return {
        props: postData,
    }
}

export default function ProductSearch({response}) {
  const posts = response.products;

  const [search, setSearch] = useState("")
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault()
    if(search.length <= 0 && e.target.value <= 0) {
      return;
    }
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const keyword = search;
    setSearch("")
    router.push({pathname : `/product/search`, query: {
      keyword: encodeURIComponent(keyword),
      page : 1
    }})
  }

  return (
    <Container className="px-4">
      <h1 className="px-4">Hello World!</h1>
      <Form className="my-3 d-flex align-items-center">
        <FormControl aria-describedby="form-control-search" value={search} onChange={handleChange}/>
        <Button variant="primary" type="submit" style={{width: "auto", wordBreak: "keep-all"}} onClick={handleSearch}>
          검색하기
        </Button>
      </Form>
      {!posts ? null : <ListProducts posts={posts}/>} 
      <Pagination
        currentPage={response.currentPage}
        maxPage={response.maxPage}
        handlePaginate={page => handlePaginate(page, router)}
      />
    </Container>
  )
}
