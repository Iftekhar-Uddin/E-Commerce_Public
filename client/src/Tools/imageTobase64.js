const imageTobase64 = async(image) =>{
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });

}

export default imageTobase64