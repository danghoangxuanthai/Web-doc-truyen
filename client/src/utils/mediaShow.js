export const imageShow = (src) => {
    return(
        <img src={src.url} alt="images" className="img-thumbnail"
              />
    )
}

export const videoShow = (src, theme) => {
    return(
        <video controls src={src.url} alt="images" className="img-thumbnail"
                />
    )
}