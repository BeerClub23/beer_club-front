import React from "react";
import { Gallery } from "react-grid-gallery";
import "./ImageGallery.scss";
import ImageGallery from "react-image-gallery";

const ImagesGallery = ({ images }) => {
  // const imagesWithSrc = images.map(({ url, ...rest }) => ({
  //   src: url,
  //   ...rest,
  // }));

  const imagesWithSrc = images.map(({ url, ...rest }) => ({
    original: url,
    thumbnail: url,
    ...rest,
  }));

  function ajustarDimensionesImagen(url, ancho, alto) {
    const urlObj = new URL(url);
    urlObj.searchParams.set("w", ancho); // Establecer el ancho
    urlObj.searchParams.set("h", alto); // Establecer el alto
    return urlObj.toString(); // Devolver la nueva URL con las dimensiones ajustadas
  }

  const anchoDeseado = 400;
  const altoDeseado = 400;

  const anchoMiniatura = 100;
  const altoMiniatura = 100;

  const imagesConDimensionesAjustadas = imagesWithSrc.map((image) => ({
    original: ajustarDimensionesImagen(
      image.original,
      anchoDeseado,
      altoDeseado,
    ),
    thumbnail: ajustarDimensionesImagen(
      image.thumbnail,
      anchoMiniatura,
      altoMiniatura,
    ),
  }));

  return (
    <div className="imagesGalleryContainer">
      <div className="imagesGallery">
        <ImageGallery
          items={imagesConDimensionesAjustadas}
          thumbnailPosition="left"
          showPlayButton={false}
          slideInterval={3000}
          showNav={true}
        />
        <Gallery images={imagesWithSrc} enableImageSelection={false} />
      </div>
    </div>
  );
};

export default ImagesGallery;
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
