const resizeImage = (imageURL, width=400, quality=60)=>{
    if(!imageURL) return "";
    return `${imageURL}?w=${width}&q=${quality}`;
}
export default resizeImage;