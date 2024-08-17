'use client';

import React from "react";
import { ChangeEvent } from "react";
import { ImageList } from "@/components/ImageList";

type ImageUploadResult = {
  results: [
    {
      id: string,
      name: string,
      analysis: Array<Analysis>
    }
  ]
}

export default function Home() {

  const handleChange = (event: ChangeEvent) => {
    const local_files = (event.target as HTMLInputElement).files;
    let localUploadedImages: Array<UserImage> = [];
    
    if (local_files == undefined || local_files.length === 0) {
      return;
    }

    let formData = new FormData();
    
    for (let x = 0; x < local_files.length; x++) {
      formData.append('files', local_files[x]);

      localUploadedImages.push(
        {
          url: URL.createObjectURL(local_files[x]),
          filename: local_files[x].name
        }
      )
    }

    const headers = {
      'content-type': "multipart/form-data"
    };

    fetch("/api/files", { body: formData, method: "post"})
      .then(response => response.json<ImageUploadResult>())
      .then(response => {
        for(let x = 0; x < response.results.length; x++) {
          let image = localUploadedImages.find(
            i => i.filename === response.results[x].name
          );

          if (image) {
            image.analysis = response.results[x].analysis;
          }
        }
      })
      .then(response => {
        setUploadedImages(localUploadedImages);
      })
  }

  const [uploadedImages, setUploadedImages] = React.useState(new Array());

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">

        <div className="row d-flex justify-content-center align-items-center
        h-100">
          <div className="col-md-8 col-lg-6 col-xl-4">

            <h3 className="mb-4 pb-2 fw-normal"
                style={{textAlign: 'center'}}>
                  AI Image Analyzer
            </h3>

            {uploadedImages.length === 0 && (
              <>
              <p>Select a number of images and upload 
                them to have them analyzed.</p>
              
              <div className="input-group rounded mb-3">
                <input className="form-control rounded"
                       aria-label="Images"
                       type="file"
                       multiple onChange={handleChange} 
                />
              </div>
              </>
            )}

            {uploadedImages.length > 0 && (
              <>
                <p style={{textAlign: 'center'}}>
                  Files uploaded successfully.
                </p>

                <ImageList images={uploadedImages} />
              </>
            )}
            

          </div>
        </div>

      </div>
    </section>
  )
}

