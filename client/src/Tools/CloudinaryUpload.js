const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CODE}/image/upload`

const CloudinaryUpload = async (image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset", "upload")
    

    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })

    return dataResponse.json()
}

export default CloudinaryUpload
