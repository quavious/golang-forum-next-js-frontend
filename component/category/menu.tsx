import axios from "axios";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

interface Menu {
    id: number;
    name: string;
}

export default function CategoryMenu({page}){
    const [menu, setMenu] = useState<Menu[]>(null)
    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`http://${process.env.API_HOST}/product/category/menu`)
            setMenu(await data.menu)
            return;
        })();
    }, [])
    if(!menu) {
        return <p className="px-4 py-2 bg-light">메뉴를 불러오고 있습니다.</p>
    }
    console.log(menu)
    return (
        <Nav variant="pills" defaultActiveKey={`/product/category/${!page ? 2 : page}`} style={{overflowX: "scroll", whiteSpace: "nowrap", flexWrap: "nowrap"}} className="d-flex">
            {
                menu.filter(el => el.id !== 1).sort((a,b) => a.id-b.id).map(el => (
                    <Nav.Item>
                    <Nav.Link href={`/product/category/${el.id}`}>{el.name}</Nav.Link>
                    </Nav.Item>
                ))
            }
        </Nav>
    )
}