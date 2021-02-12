export default function ListProducts({posts}){
    const handleErrorImage = (e, id) => {
        e.preventDefault()
        const errElement = document.getElementById(`poster_${id}`) as HTMLImageElement;
        errElement.src = "https://www.flaticon.com/svg/vstatic/svg/1380/1380659.svg?token=exp=1613133205~hmac=91edfdaeac06550f577461054721a8b0"
    }
    return (
        posts.map(post => (
            <div key={post.id} className="mt-4 px-4 d-flex justify-content-start align-items-start">
                <img src={post.image_url} id={`poster_${post.id}`} alt="product_poster" width="120" onError={e => handleErrorImage(e, post.id)}/>
                <div className="d-flex flex-column mx-4">
                <h4>{post.name}</h4>
                {/* <span>{post.Category.value}</span> */}
                <small>By {post.company}</small>
                <div className="d-flex align-items-center mt-1">
                    <strong className="text-danger">{post.sale_price}원 {post.discount_rate}%</strong>
                    <a href={post.link_url} target="_blank" rel="noreferrer" className="mx-2 btn btn-primary">구매하기</a>
                </div>
                </div>
            </div>
        ))
    )
}