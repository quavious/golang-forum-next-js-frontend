import axios from 'axios';
import { GetServerSideProps } from 'next';
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

export const getServerSideProps:GetServerSideProps = async({query, res}) => {
    const {id} = query
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
        res.writeHead(301, {location: `/post/${id}`}).end()
        return;
    }
}

export default function PostModify({response, id}) {
    const [password, setPassword] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const router = useRouter();

    const initialize = () => {
        setTitle("")
        setPassword("")
        setContent("")
    }

    useEffect(() => {
        setTitle(response.title)
        setContent(response.content)
        return () => initialize()
    }, [])

    const handleClear = async (data) => {
        if(!await data || !await data.status) {
            initialize()
            alert("다시 입력바랍니다.");
        } else {
            console.log(await data)
            initialize()
            router.push("/")
        }
    }

    const handleModify = async () => {
        const resp = await axios.post(`http://${process.env.API_HOST}/post/id/${id}/update`, {
            password,
            title,
            content,
        })
        await handleClear(await resp.data);
        
    }
    const handleDelete = async () => {
        const resp = await axios.post(`http://${process.env.API_HOST}/post/id/${id}/delete`, {
            password,
        })
        await handleClear(await resp.data);
    }
    const handleSubmit = async (e, param: string) => {
        e.preventDefault()
        switch(param) {
            case "modify":
                handleModify();
                break;
            case "delete":
                handleDelete();
                break;
            default:
                break;
        }
    }
    const handleChange = (e, param) => {
        e.preventDefault()
        switch(param){
            case "password":
                setPassword(e.target.value)
                break;  
            case "title":
                setTitle(e.target.value)
                break;  
            case "content":
                setContent(e.target.value)
                break;
            default:
                break;
        }
    }
    return (
        <Container className="d-flex flex-column align-items-center">
            <Form>
                <Form.Group controlId="formText.Title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" placeholder="제목을 입력하세요." onChange={e => handleChange(e, "title")} value={title} />
                </Form.Group>
                <Form.Group controlId="formText.Content">
                    <Form.Label>본문</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="내용을 입력하세요." onChange={e => handleChange(e, "content")} value={content} />
                </Form.Group>
                <h5 className="my-2">올바른 비밀번호를 입력해야 글을 수정 또는 삭제할 수 있습니다.</h5>
                <Form.Group controlId="formPassword">
                    <Form.Label>게시물 비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호" onChange={e => handleChange(e, "password")} value={password} />
                    <Form.Text className="text-muted">
                        비밀번호는 안전하게 암호화됩니다.
                    </Form.Text>
                </Form.Group>
                <Button variant="warning" onClick={e => handleSubmit(e, "modify")}>
                    수정하기
                </Button>
                <hr/>
                <Button variant="danger" onClick={e => handleSubmit(e, "delete")}>
                    삭제하기
                </Button>
            </Form>
        </Container>
    )
}