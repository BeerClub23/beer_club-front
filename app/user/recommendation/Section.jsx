"use client";
import React, { useEffect, useState } from "react";
import "./RecommendationSection.scss";
import { Typography, Box } from "@mui/material";
import { useGetTopProducts } from "../../services/topProducts";
import { useUserBeerContext } from "../../context/user";
import { useGetPersonalTopProducts } from "../../services/personalTopProducts";
import ImagesGallery from "../../components/imagesGallery/ImagesGallery";
import RateReadOnlyCard from "../../components/rateReadOnlyCard/RateReadOnlyCard";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Carousel from "react-material-ui-carousel";
import TopProductsCard from "../../components/topProductsCard/TopProductsCard";
import RateCard from "../../components/rateCard/RateCard";
import Cookies from "js-cookie";
import {
  getRecommendationBySubscriptionIdAndDate,
  rateRecommendation,
} from "../../services/recommendation";
import Swal from "sweetalert2";

const RecommendationSection = ({ id }) => {
  const token = Cookies.get("jwt");
  const { user } = useUserBeerContext();
  const [recommendation, setRecommendation] = useState();
  const [recommendationsSplit, setRecommendationsSplit] = useState([]);

  const rateProduct = (vote) => {
    const voting = {
      ...vote,
      productId: recommendation.product.id,
      userId: user.id,
    };
    rateRecommendation(voting)
      .then(() => {
        Swal.fire({
          title: "Votación realizada con éxito!",
          text: "Gracias por dejar a otros saber que te pareció este producto",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          // onClick: handleClick(),
          focusConfirm: false,
        }).then(() => window.location.reload());
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error,
          imageAlt: "No se pudo realizar la votación. Intenta Nuevamente!",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          icon: "error",
          focusConfirm: false,
        });
      });
  };

  const isImageURLPresent = (imagesArray, imageUrl) => {
    return imagesArray.some((image) => image.url === imageUrl);
  };

  useEffect(() => {
    if (user && user.subscriptionId && !recommendation) {
      const getCurrentRecommendation = async () =>
        await getRecommendationBySubscriptionIdAndDate(
          user.subscription.id,
          token,
        );
      getCurrentRecommendation().then((response) =>
        setRecommendation(response),
      ).catch(setRecommendation(""))
    }
    if (recommendation) {
      if (recommendation.description) {
        setRecommendationsSplit(
          recommendation.description.match(/[^\.]+(\.|\b)/g),
        );
      }

      if (recommendation.product && recommendation.image_url) {
        recommendation.product.image_url =
          recommendation.product.image_url || [];

        if (
          !isImageURLPresent(
            recommendation.product.image_url,
            recommendation.image_url,
          )
        ) {
          recommendation.product.image_url.push({
            url: recommendation.image_url,
            rows: 2,
            cols: 2,
          });
        }
      }
    }
  }, [user, recommendation, token]);

  const { topProducts } = useGetTopProducts();
  const { personalTopProducts } = useGetPersonalTopProducts(id);
  return (
    <>
      {recommendation ? (
        <section className="recommendationSection">
          <article className="recommArticle">
            <Box className="topContainer">
              <Box className="imagesGrid">
                <ImagesGallery
                  images={recommendation.product.image_url.slice(0, 6)}
                ></ImagesGallery>
              </Box>

              <Box className="titleContainer">
                <Box className="recommRate">
                  <RateReadOnlyCard
                    rate={recommendation.product.productScore * 0.5}
                  />
                </Box>
                <Box>
                  <Typography variant="h3" className="recommTitle">
                    {" "}
                    Producto{" "}
                    <span variant="body1" className="recommSpan">
                      del mes
                    </span>{" "}
                  </Typography>
                  <Typography variant="h5" className="recommSubtitle">
                    {recommendation.title}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="recommTextContainer">
              <Typography
                className="recommText"
                sx={{ fontSize: "24px", padding: "30px 0px" }}
              >
                Recomendaciones del sommelier:
              </Typography>
              {recommendationsSplit.map((item, index) => (
                <Typography key={index} className="recommText">
                  <ArrowRightIcon className="beerIcon"></ArrowRightIcon>
                  {item}
                </Typography>
              ))}
            </Box>
            {
              recommendation.reviewed ? 
              <Typography
                className="recommText"
                sx={{ fontSize: "16px", padding: "70px 0px" }}
              >
                Ya calificaste este producto. ¡Gracias por compartir tu experiencia con todos los miembros!
              </Typography> :
              <RateCard rate={rateProduct} />
            }
          </article>

          <aside className="recommAside">
            <Typography className="recommAsideTitle">
              Los más votados
            </Typography>
            <Carousel
              autoPlay={true}
              indicators={true}
              stopAutoPlayOnHover={true}
              interval={3000}
              duration={1000}
              animation="slide"
              className="home__carousel"
              // navButtonsAlwaysVisible={true}
              // navButtonsAlwaysInvisible={false}
            >
              {topProducts.map((product, index) => (
                <TopProductsCard key={index} {...product} />
              ))}
            </Carousel>
            <Typography className="recommAsideTitle">Tus Favoritos</Typography>
            <Carousel
              autoPlay={true}
              indicators={true}
              stopAutoPlayOnHover={true}
              interval={3000}
              duration={500}
              animation="slide"
              className="home__carousel"
              navButtonsAlwaysVisible={false}
              navButtonsAlwaysInvisible={false}
            >
              {personalTopProducts?.length && personalTopProducts.map((product, index) => (
                <TopProductsCard key={index} {...product} />
              ))}
            </Carousel>
          </aside>
        </section>
      ) : (
        <>
        <Typography sx={{color:"black"}}>
          PROXIMAMENTE
        </Typography>
        </>
      )}
    </>
  );
};

export default RecommendationSection;
