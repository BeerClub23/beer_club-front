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

  const anchoDeseado = 350;
  const altoDeseado = 350;

  const anchoMiniatura = 200;
  const altoMiniatura = 200;

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
