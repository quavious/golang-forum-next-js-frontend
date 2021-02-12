import { Button, Container, Form } from "react-bootstrap";
import axios from 'axios';
import {useState, useEffect, Fragment} from 'react'
import { GetServerSideProps } from "next";
import Link from "next/link";

import styles from '../../styles/Form.module.css'
import clearString from "../../utils/clear/string";
import Comment from '../../component/comment/index';

export const getServerSideProps:GetServerSideProps = async({query}) => {
    const {id} = query;
    try {
        if (typeof id !== "string"){
            throw new Error("The parameter is not valid")
        }
        const resp = await axios.get(`http://${process.env.API_HOST}/post/id/${id}`)
        const data = await resp.data;
        if (!data || !data.status){
            throw new Error("Request Failed")
        }
        return {
            props: {
                response: data.response,
                id,
            }
        }
    } catch (err) {
        console.error(err)
        return {
            props: {
                response: null,
                id: null,
            }
        }
    }
}

export default function Post({response}){
    const post = response;
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [content, setContent] = useState("")

    const [comments, setComments] = useState<any[]>(post.edges.Comments)

    const handleChange = (e, param) => {
        e.preventDefault();
        switch(param){
            case "username":
                setUsername(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            case "content":
                setContent(e.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            clearString(setUsername, setContent, setPassword);
            const {data} = await axios.post(`http://${process.env.API_HOST}/comment/post/${post.id}/create`, {
                username, password, content
            })
            if(!data || !data.status) {
                throw new Error("댓글을 등록할 수 없습니다.")
            }
            const {data: updated} = await axios.get(`http://${process.env.API_HOST}/comment/post/${post.id}`)
            setComments(updated.response);
        } catch(err){
            console.error(err)
            alert(err.message)
        }
    }

    if(!post){
        return <h1>컨텐츠를 불러오고 있습니다.</h1>
    }
    return (
        <Container className="d-flex flex-column align-items-start">
            <h4><strong>{post.title}</strong></h4>
            <div className="d-flex align-items-center">
                <span>{post.username}</span>
                <span className="mx-1">[{post.user_ip}]</span>
                <small className="mx-2">{new Date(post.created_at).toLocaleString()}</small>
            </div>
            <hr className="w-100 my-1"/>
            <p>{post.content}</p>
            <small>{new Date(post.updated_at).toLocaleString()}에 마지막으로 수정되었습니다.</small>
            <Link href={`/post/modify/${post.id}`}>
                <span className="btn btn-danger mt-2">글 수정•삭제</span>
            </Link>
            <hr />
            <h4><strong>댓글</strong></h4>
            <Form className={styles["form-max-width"]}>
                <div className="d-flex justify-content-between">
                <Form.Group controlId="formCommentUsername" className="w-50 mr-2">
                    <Form.Control size="sm" type="text" placeholder="사용자 이름" onChange={e => handleChange(e, "username")} value={username}/>
                    <Form.Text className="text-muted">
                    IP는 사용자를 식별하기 위한 용도로 사용됩니다.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formCommentPassword" className="w-50 ml-2">
                    <Form.Control size="sm" type="password" placeholder="비밀번호" onChange={e => handleChange(e, "password")} value={password} />
                    <Form.Text className="text-muted">
                    비밀번호는 안전하게 암호화됩니다.
                    </Form.Text>
                </Form.Group>
                </div>
                <Form.Group controlId="formCommentContent">
                    <Form.Control size="sm" as="textarea" rows={2} placeholder="댓글을 입력하세요." onChange={e => handleChange(e, "content")} value={content} />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    업로드
                </Button>
            </Form>
            {comments.map((el, idx) => {
                return (
                    <Comment key={idx} comment={el} setComments={setComments} postId={post.id} />
                )
            })} 
        </Container>
    )
}