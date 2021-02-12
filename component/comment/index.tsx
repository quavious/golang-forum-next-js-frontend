import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Comment({comment, setComments, postId}){
    const [password, setPassword] = useState("")
    
    const handleClick = (e) => {
        e.preventDefault()
        let form = document.getElementById("comment-form")
        form.classList[0] === "d-flex" ? 
        form.classList.replace("d-flex", "d-none") : 
        form.classList.replace("d-none", "d-flex")
    }

    const handleChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setPassword("");
        try {
            const {data} = await axios.post(`http://${process.env.API_HOST}/comment/delete/${comment.id}`, {
                password,
            })
            if(!data || !data.status) {
                throw new Error("댓글을 삭제할 수 없습니다.")
            }
            const {data: updated} = await axios.get(`http://${process.env.API_HOST}/comment/post/${postId}`)
            
            setComments(await updated.response);
        } catch(err) {
            console.error(err)
        }
    }
    if(comment.isDeleted) {
        return (
        <div className="mt-2 mb-0 pb-2 border-bottom bg-secondary" key={comment.id}>
            <strong>{comment.username} [{comment.user_ip}]</strong>
            <strong className="ml-2">이 댓글은 삭제되었습니다.</strong>
        </div>
        )
    }
    return (
        <div className="mt-2 mb-0 pb-2 border-bottom" key={comment.id} onClick={handleClick}>
            <strong>{comment.username} [{comment.user_ip}]</strong>
            <small className="mx-2">{new Date(comment.created_at).toLocaleString()}</small>
            <p className="my-1">{comment.content}</p>
            <Form className="d-none justify-content-start" id={"comment-form"}>
                <Form.Group controlId="formCommentPasswordMatch" className="my-0">
                    <Form.Control type="password" placeholder="비밀번호 입력" size="sm" onChange={handleChange} value={password}/>
                </Form.Group>
                <Button size="sm" className="ml-2" variant="danger" onClick={handleSubmit}>
                    댓글 삭제
                </Button>
            </Form>
        </div>
    )
}