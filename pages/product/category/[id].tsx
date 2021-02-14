import axios from 'axios'
import { GetServerSideProps } from 'next'
import {useRouter} from 'next/router'
import { useState } from 'react'
import { Button, Container, FormControl, InputGroup, Nav } from 'react-bootstrap'
import CategoryMenu from '../../../component/category/menu'
import ListProducts from '../../../component/list/products'
import Pagination from '../../../component/pagination'
import handlePaginate from '../../../utils/paginate'

export const getServerSideProps:GetServerSideProps = async({query}) => {
  const {id} = query;
  const page = query.page || 1;
  let postData = null;

  try {
    const resp = await axios.get(`http://${process.env.API_HOST}/product/category/${id}/${page}`);
    postData = {response: await resp.data, categoryId: id};
  } catch (err) {
    console.error(err);
    postData = {response: null, categoryId: id};
  }
  return {
    props: postData,
  }
}

export default function ProductWithCategory({response, categoryId}) {
  const posts = response.products
  const [search, setSearch] = useState("")

  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch("")
    router.push({pathname : `/product/search`, query: {
      keyword: encodeURIComponent(search),
      page : 1
    }})
  }

  return (
    <Container className="px-4">
      <h1 className="px-4">Hello World!</h1>
      <CategoryMenu page={categoryId} />
      <InputGroup className="my-3">
          <FormControl aria-describedby="form-control-search" value={search} onChange={handleChange}/>
          <Button variant="primary" type="submit" onClick={handleSearch}>
            검색하기
          </Button>
      </InputGroup>
      {!posts ? null : <ListProducts posts={posts}/>}
      <Pagination
        currentPage={response.currentPage}
        maxPage={response.maxPage}
        handlePaginate={page => handlePaginate(page, router)}
      />
    </Container>
  )
}
