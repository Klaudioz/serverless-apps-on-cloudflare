'use client';

import React, { useRef } from "react";
import { ChangeEvent } from "react";
import { ImageList } from "@/components/ImageList";
import useFileUpload from "@/hooks/use_handle_image_upload";
import usePollForAnalysis from "@/hooks/use_poll_for_analysis";

export default function Home() {
  // START:use_ref
  const intervalRef = useRef(0);
  // END:use_ref
  
  const handleChange = async (event: ChangeEvent) => {
    const files = (event.target as HTMLInputElement).files;

    if (!files) {
      return;
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const uploadedImages = await useFileUpload(files);

    // START:set_interval
    if (uploadedImages) {
      setUploadedImages(uploadedImages);

      intervalRef.current = window.setInterval(
        pollForAnalysis,
        2000,
        uploadedImages
      );
    }
    // END:set_interval
  }

  // START:poll_func
  const pollForAnalysis = async(uploadedImages: Array<UserImage>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imagesWithAnalysis = await usePollForAnalysis(uploadedImages);

    if (imagesWithAnalysis.every(i => i.analysis)) {
      window.clearInterval(intervalRef.current);
    }

    setUploadedImages([...imagesWithAnalysis]);
      
  }
  // END:poll_func

  const [uploadedImages, setUploadedImages] = React.useState(
    new Array<UserImage>()
  );

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

