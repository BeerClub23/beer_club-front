import React from "react";
import { Gallery } from "react-grid-gallery";
import "./ImageGallery.scss";

const ImageGallery = ({ images }) => {
  

  const imagesWithSrc = images.map(({ url, ...rest }) => ({
    src: url,
    ...rest,
  }));
  
  return (
    <div>
      <Gallery images={imagesWithSrc} enableImageSelection={false}  />
    </div>
  );
};

export default ImageGallery;
/*
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ImageGallery = ({ images }) => {

  return (
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={90}
    >
       {images.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.url, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))} 
    </ImageList>
  );
};

export default ImageGallery;*/
