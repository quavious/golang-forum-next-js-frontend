import { Container, Nav, Navbar } from "react-bootstrap";

export default function Navigation(){
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="/?page=1">
                    <img className="mr-2" src="https://www.flaticon.com/svg/vstatic/svg/1534/1534072.svg?token=exp=1613133047~hmac=9db0b7f9328126594dd420eb19454c20" width="30"/>
                    Anonymous Board
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/product" className="">냉동식품</Nav.Link>
                        <Nav.Link href="/post/create" className="">글 작성</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}