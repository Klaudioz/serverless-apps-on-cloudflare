type ImageUploadResult = {
  id: string,
  filename: string
}

const useFileUpload = async(files: FileList) => {
  let uploadedImages: Array<UserImage> = [];

  if (files == undefined || files.length === 0) {
    return;
  }

  let formData = new FormData();

  for (let x = 0; x < files.length; x++) {
    formData.append('files', files[x]);

    uploadedImages.push(
      {
        url: URL.createObjectURL(files[x]),
        filename: files[x].name
      }
    )
  }

  const headers = {
    'content-type': "multipart/form-data"
  };

  await fetch("/api/files", { body: formData, method: "post"})
    .then(response => response.json<ImageUploadResult[]>())
    .then(response => {
      for(let x = 0; x < response.length; x++) {
        let image = uploadedImages.find(
          i => i.filename === response[x].filename
        )

        if (image) {
          image.id = response[x].id
        }
      }
    })

  return uploadedImages;
}

export default useFileUpload;

