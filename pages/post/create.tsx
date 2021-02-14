import { Button, Container, Form } from "react-bootstrap";
import axios from 'axios'
import {useState} from 'react'
import {useRouter} from 'next/router'
import styles from "../../styles/Form.module.css"

export default function Write(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const initialize = () => {
        setTitle("")
        setUsername("")
        setPassword("")
        setContent("")
    }

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Submit")
        const resp = await axios.post(`http://${process.env.API_HOST}/post`, {
            username,
            password,
            title,
            content,
        })
        const data = await resp.data;
        if(!await data || !await data.status) {
            initialize()
            alert("다시 입력바랍니다.");
        } else {
            console.log(await data.response)
            initialize()
            router.push("/post")
        }
    }
    const handleChange = (e, param) => {
        e.preventDefault()
        switch(param){
            case "username":
                setUsername(e.target.value)
                break;
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
            <Form className={styles["form-max-width"]}>
                <Form.Group controlId="formUsername">
                    <Form.Label>사용자 이름</Form.Label>
                    <Form.Control type="text" placeholder="사용자 이름" onChange={e => handleChange(e, "username")} value={username}/>
                    <Form.Text className="text-muted">
                    IP는 사용자를 식별하기 위한 용도로 사용됩니다.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호" onChange={e => handleChange(e, "password")} value={password} />
                    <Form.Text className="text-muted">
                    비밀번호는 안전하게 암호화됩니다.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formText.Title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" placeholder="제목을 입력하세요." onChange={e => handleChange(e, "title")} value={title} />
                </Form.Group>
                <Form.Group controlId="formText.Content">
                    <Form.Label>본문</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="내용을 입력하세요." onChange={e => handleChange(e, "content")} value={content} />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    업로드
                </Button>
            </Form>
        </Container>
    )
}