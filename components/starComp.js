function StarRating(props){
    
    return(
        <>
            <span className={`rating_box ${props.className?props.className:''}`}>
            {[...Array(5)].map((star, index) => ( 
                <i key={index} className={`fas fa-star ${props.rate >= index+1 ?'active':''}`}></i>
            ))}
            </span>
        </>
    )
}
export default StarRating;