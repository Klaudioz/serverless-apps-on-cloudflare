import PropTypes from "prop-types";

type ImageListProps = {
  images: Array<UserImage>
}

export const ImageList = ({images}: ImageListProps) => {
  return (
    <div className="row d-flex justify-content-center align-items-center
        h-100">
      <div className="col-12">

      {Object.values(images).map((image, index) => {
        return (
          <>
            <div className="row d-flex">
              <div className="col-6">
                <img src={image.url}
                      width="100%" />
              </div>
              <div className="col-6">
                Image analysis will go here
              </div>
            </div>
            <hr />
          </>
        )
      })} 

      </div>
    </div>
  )
}

ImageList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape(
      {
        url: PropTypes.string.isRequired,
        filename: PropTypes.string.isRequired
      }
    )
  )
}

