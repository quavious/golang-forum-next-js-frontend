import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, InputGroup } from "react-bootstrap";
import Pagination from "../../../component/pagination";
import handlePaginate from "../../../utils/paginate";

export const getServerSideProps:GetServerSideProps = async ({query, res}) => {
    try {
        const page = !query.page ? 1 : query.page;
        const param = query.keyword
        
        if(typeof param !== "string" || decodeURIComponent(param).length < 2) {
            throw new Error("Search Parameter Invalid")
        }

        const {data} = await axios.get(`http://${process.env.API_HOST}/post/search/title/${param}/${page}`)

        return {
            props: {
                response: await data,
            }
        }
    } catch(err) {
        console.error(err)
        res.writeHead(301, {location: `/`}).end()
        return {
          props: {
            response: null,
          }
        }
    }
}

export default function PostSearch({response}) {
    const posts = response.response
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
      router.push({pathname: `/post/search`, query: {
        keyword: encodeURIComponent(keyword),
        page : 1
      }})
    }
  
    return (
      <Container>
        <h1>Hello World!</h1>
        {!posts ? null : posts.map(post => (
          <div key={post.id} className="d-flex flex-column align-items-start mt-2">
            <Link href={`/post/${post.id}`}><h4 className="my-1">{post.title}</h4></Link>
            <span>{post.username}</span>
            <small className="">{new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))}
        <Form className="my-3 d-flex align-items-center">
            <Form.Control aria-describedby="form-control-search" value={search} onChange={handleChange}/>
            <Button variant="primary" type="submit" style={{width: "auto", wordBreak: "keep-all"}} onClick={handleSearch}>
              검색하기
            </Button>
        </Form>
        <Link href="/post/create"><span className="btn btn-outline-primary">작성</span></Link>
        <Pagination
          currentPage={response.currentPage}
          maxPage={response.maxPage}
          handlePaginate={page => handlePaginate(page, router)}
        />
      </Container>
    )
}