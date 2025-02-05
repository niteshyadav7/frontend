import ImageShow from "./ImageShow.js";

function ImageList({ imageData }) {
  return (
    <>
      <div>
        {imageData.map((image) => (
          <ImageShow key={image.id} image={image.urls.small} />
        ))}
      </div>
    </>
  );
}

export default ImageList;
