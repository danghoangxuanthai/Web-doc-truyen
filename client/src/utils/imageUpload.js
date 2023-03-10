export const checkImage = (file) => {
    let err = ''
    if(!file) return err = 'File doesnt exists'
    if(file.size > 1024 * 1024) err = 'Size too large'
    if(file.type !== 'image/png' && 'image./jpeg') err = 'File type is incorrect'
    return err
}
export const imageUpload = async (avatar) => {
    let imgArr = []
    for (const item of avatar){
        const formData = new FormData()
        
        formData.append('file', item)
        formData.append('upload_preset', 'egppt1ud')
        formData.append('cloud_name', 'dsv8fypbz')
        const res = await fetch("https://api.cloudinary.com/v1_1/dsv8fypbz/upload", {
            method: 'POST', 
            body: formData
        })
        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
}