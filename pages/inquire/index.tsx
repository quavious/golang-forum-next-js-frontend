import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../styles/Form.module.css"
import clearString from "../../utils/clear/string";

export default function Inquire(){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [linkRef, setLinkRef] = useState("")

    const router = useRouter();

    const handleEmail = async (e) => {
        e.preventDefault()
        clearString(setTitle, setContent, setLinkRef)
        alert("문의 테스트")
        // try {
        //     const {data} = await axios.post("http://localhost:5000/api/inquire", {
        //         title, content, linkRef
        //     })
        //     if(!data || !data.response) {
        //         throw new Error("메일을 전송하지 못했습니다.")
        //     }
        //     alert("메일을 보냈습니다.")
        //     router.push({pathname:"/", query: {
        //         page: 1,
        //     }})
        // } catch(err) {
        //     console.error(err)
        //     alert(err.message)
        // }
    }

    const handleChange = (e, param) => {
        e.preventDefault();
        switch(param){
            case "title":
                setTitle(e.target.value)
                break;
            case "content":
                setContent(e.target.value)
                break;
            case "linkRef":
                setLinkRef(e.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <Container className="d-flex flex-column align-items-center">
            <h6 className="text-danger text-center font-weight-bold my-2">
                IP는 사용자를 식별하기 위한 용도로 사용됩니다.
            </h6>
            <Form className={styles["form-max-width"]}>
                <Form.Group controlId="formText.Title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" placeholder="제목을 입력하세요." value={title} onChange={e => handleChange(e, "title")}/>
                </Form.Group>
                <Form.Group controlId="formText.Content">
                    <Form.Label>본문</Form.Label>
                    <Form.Control as="textarea" rows={6} placeholder="내용을 입력하세요." value={content} onChange={e => handleChange(e, "content")}/>
                </Form.Group>
                <Form.Group controlId="formText.AdLink">
                    <Form.Label>주소 첨부</Form.Label>
                    <Form.Control type="text" placeholder="" value={linkRef} onChange={e => handleChange(e, "linkRef")}/>
                    <Form.Text className="text-muted">
                    관리자가 참고할 수 있는 게시물의 링크만 작성 부탁드립니다.
                    </Form.Text>
                </Form.Group>
                <h5 className="font-weight-light">
                    허위 사실을 작성한 경우 문의가 기각될 수 있습니다.
                </h5>
                <Button variant="primary" onClick={handleEmail}>
                    업로드
                </Button>
            </Form>
        </Container>
    )
}