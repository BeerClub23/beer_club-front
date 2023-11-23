"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/material";
import "./ProductSection.scss";

const ProductSection = () => {
  return (
    <section className="productSection">
      <Container className="container">
        <Typography sx={{ marginTop: "50px" }} variant="h3" className="title">
          ¡Bienvenido!
        </Typography>
        {/* <Box className="articleProduct"> 
          <Typography data-aos="fade-down" variant="h6" className="textProduct">
            Este mes, estamos entusiasmados por presentarte una selección
            exquisita de cervezas artesanales. En esta entrega, hemos preparado
            un six pack especial que captura la esencia y la riqueza de la
            cerveza negra.
          </Typography> */}

        <Box className="imageContainer">
          {/* <Image
              src={image}
              // src="https://images.unsplash.com/photo-1621428674699-90ec7bae03c9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Unsplash Image"
              width={240}
              height={300}
              className="productImage"
            /> */}

          {/* <Carousel
              autoPlay={true}
              indicators={false}
              stopAutoPlayOnHover={true}
              interval={3000}
              duration={1000}
              animation="slide"
              className="home__carousel"
              // navButtonsAlwaysVisible={true}
              // navButtonsAlwaysInvisible={false}
            >
              {images.map((image, index) => (
                <ProductImage key={index} image={image} />

                // <img
                //   // src="https://images.unsplash.com/photo-1621428674699-90ec7bae03c9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                //   alt="Unsplash Image"
                //   // width={240}
                //   // height={300}
                //   className="home__image"
                // />
              ))}
            </Carousel>
          </Box> */}
          {/* <Box className="stars">
            <StyledEngineProvider injectFirst>
              <Stars />
            </StyledEngineProvider>
          </Box> */}
        </Box>
      </Container>
    </section>
  );
};

export default ProductSection;
