function BookCard({title, author, price = 0, isBestSeller = false, categories = []  }) {
    return (
        <div> 
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{price] ₾</p>

                {isBestSeller && <span>🔥 ბესტსელერი</span>}

                {categories.map((category, index) => (
                    <span key={index}>#{category} </span>
                ))}

        </div>
    )
}
export default BookCard;