"use client";
import React, { useEffect, useState } from "react";
import "./RecommendationSection.scss";
import { Typography, Box, Container } from "@mui/material";
import { useGetTopProducts } from "../../services/topProducts";
import { useUserBeerContext } from "@/app/context/user";
import { useGetPersonalTopProducts } from "../../services/personalTopProducts";
import ImageGallery from "../../components/imageGallery/ImageGallery";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Carousel from "react-material-ui-carousel";
import TopProductsCard from "../../components/topProductsCard/TopProductsCard";
import RateCard from "../../components/rateCard/RateCard";
import Cookies from "js-cookie";
import { getRecommendationBySubscriptionIdAndDate } from "../../services/recommendation";

const RecommendationSection = ({ id }) => {
  const token = Cookies.get("jwt");
  const { user } = useUserBeerContext();
  const [recommendation, setRecommendation] = useState();
  const [recommendationsSplit, setRecommendationsSplit] = useState([]);


  useEffect(() => {
    if (user && user.subscription && !recommendation) {
      const getCurrentRecommendation = async () =>
        await getRecommendationBySubscriptionIdAndDate(
          user.subscription.id,
          token,
        );
      getCurrentRecommendation().then((response) =>
        setRecommendation(response),
      );      
    } 
    if (recommendation) {
      if (recommendation.description) {

        setRecommendationsSplit(recommendation.description.match(/[^\.]+(\.|\b)/g));
      }

      function isImageURLPresent(imagesArray, imageUrl) {
        return imagesArray.some((image) => image.url === imageUrl);
      }
      if (recommendation.product && recommendation.image_url) {
        recommendation.product.image_url = recommendation.product.image_url || [];

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

  const { topProducts, isLoadingTop, isErrorTop } = useGetTopProducts();
  const { personalTopProducts, isLoadingPersonalTop, isErrorPersonalTop } =
    useGetPersonalTopProducts(id);
  return (
    <>
      <Typography
        sx={{ marginTop: "50px", color: "white" }}
        variant="h3"
        className="recommSectionTitle"
      >
        ¡Bienvenido!
      </Typography>
      {recommendation && recommendation.product ? 
        <section className="recommendationSection">
          {/* <Container className="recommContainer"> */}
          <article className="recommArticle">
            <Box className="topContainer">
              <Box className="imagesGrid">
                <ImageGallery
                  images={recommendation.product.image_url.slice(0, 6)}
                ></ImageGallery>
              </Box>
              <Box>
                <Box className="titleContainer">
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
            <RateCard />
          </article>
          {/* </Container> */}
          <aside className="recommAside">
            <Typography className="recommAsideTitle">Los más votados</Typography>
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
                <TopProductsCard key={index} product={product} />
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
              {personalTopProducts.map((product, index) => (
                <TopProductsCard key={index} product={product} />
              ))}
            </Carousel>
          </aside>

          {/* </Container> */}
        </section> : <></>
      }
    </>
  );
};

export default RecommendationSection;
