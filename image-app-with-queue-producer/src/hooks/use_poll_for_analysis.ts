type ImageAnalysisResponse = {
  id: string,
  analysis: Analysis[]
}

const usePollForAnalysis = async(uploadedImages: Array<UserImage>) => {
  const image_ids = uploadedImages.map(x => x.id)

  await fetch(`/api/files?image_ids=${image_ids.join()}`)
    .then(response => response.json<Array<ImageAnalysisResponse>>())
    .then(response => {
      for (let x = 0; x < response.length; x++) {
        if (!response[x].analysis) {
          continue;
        }

        let image = uploadedImages.find(
          i => i.id === response[x].id
        )

        if (image) {
          image.analysis = response[x].analysis;
        }
      }
    })

  return uploadedImages;
}

export default usePollForAnalysis;

