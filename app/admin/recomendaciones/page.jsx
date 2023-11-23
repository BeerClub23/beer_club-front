"use client";
import { Box, Chip } from "@mui/material";
import RecommendationCard from "../../components/admin/adminRecommendation/RecommendationCard";
import RecommendationTable from "../../components/admin/adminRecommendation/RecommendationTable";
import CreateRecommendationForm from "../../components/admin/adminRecommendation/CreateRecommendationForm";
import { useState } from "react";
import Swal from "sweetalert2";
import "./recommendation.scss";

//Delete when the real data is available
const dataDummy = [
  {
    id: 1,
    title: "Tiulo de recomendaación para producto 1",
    description: "descripción de la recomendación,",
    createDate: "20-11-2023",
    product: {
      id: 2,
      name: "nombre de product",
      description: "descripción del producto",
      productScore: 0,
      image_url: [
        {
          url: "https://unadireccion-com/image/0xqwe1",
        },
        {
          url: "https://unadireccion-com/image/0xqwe2",
        },
      ],
    },
    subscription_id: 1,
    image_url: "https://unadireccion-com/image/0xqwe",
  },
  {
    id: 2,
    title: "Tiulo de recomendaación para producto 2",
    description: "descripción de la recomendación,",
    createDate: "20-11-2023",
    product: {
      id: 3,
      name: "nombre de product",
      description: "descripción del producto",
      productScore: 0,
      image_url: [
        {
          url: "https://unadireccion-com/image/0xqwe1",
        },
        {
          url: "https://unadireccion-com/image/0xqwe2",
        },
      ],
    },
    subscription_id: 2,
    image_url: "https://unadireccion-com/image/0xqwe",
  },
  {
    id: 3,
    title: "Tiulo de recomendaación para producto 3",
    description: "descripción de la recomendación,",
    createDate: "20-11-2023",
    product: {
      id: 4,
      name: "nombre de product",
      description: "descripción del producto",
      productScore: 0,
      image_url: [
        {
          url: "https://unadireccion-com/image/0xqwe1",
        },
        {
          url: "https://unadireccion-com/image/0xqwe2",
        },
      ],
    },
    subscription_id: 3,
    image_url: "https://unadireccion-com/image/0xqwe",
  },
];

const RecomendacionesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState(dataDummy); // Locla State to manage recommendation data - change for the real data

  // Function to toggle the Recommendation form
  const handleCreateRecommendation = () => {
    setShowModal(true);
  };

  // Function to toggle the Recommendation Table
  const handleShowRecommendation = () => {
    setShowModal(false);
  };

  // CRUD methods
  const handleCreate = async (formData) => {
    try {
      console.log("Simulated POST request successful!");
      console.log("Data sent:", formData);

      Swal.fire({
        title: "Recomendación creada",
        text: "Nueva recomendación creada exitosamente",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#ceb5a7",
        focusConfirm: false,
      });
      /*     
      const response = recommendationPostMethod

      //if (response.status === 201) {
        Swal.fire({
          title: "Recomendación creada",
          text: "Nueva recomendación creada exitosamente",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
        // Update local state by adding the new recommendation
        setRecommendations((prevRecommendations) => [
         ..prevRecommendations,
          response.data,
        ]);
      } else if (response.status !== 200) {
        const error = Object.keys(response.response.data).reduce(
          (acc, key) => `${acc}${response.response.data[key]}\n`,
          ""
        );
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
      } */
    } catch (error) {
      console.error("Error creating recomendation:", error);
    }
  };
  const handleSave = async (formData, id) => {
    try {
      console.log("Simulated PUT request successful!");
      console.log("Data sent:", formData);

      Swal.fire({
        title: "Recomendación actualizada",
        text: "Nueva recomendación con id: " + id + " actualizada exitosamente",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#ceb5a7",
        focusConfirm: false,
      });
      /*  
      //const response = put recommendation method

      //if (response.status === 201) {
        Swal.fire({
          title: "Recomendación actualizad",
          text: "Nueva recomendación actualizada exitosamente",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
        // Update local state by adding the edited reccomendation
         setRecommendations((prevRecommendations) =>
      prevRecommendations.map((rec) =>
        rec.id === id ? { ...rec, ...formData } : rec
      )
    );
      } else if (response.status !== 200) {
        const error = Object.keys(response.response.data).reduce(
          (acc, key) => `${acc}${response.response.data[key]}\n`,
          ""
        );
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
      } */
    } catch (error) {
      console.error("Error editing recomendation:", error);
    }
  };

  return (
    <Box
      sx={{
        mt: 10,
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "2px 0px 1px #8D8D8D",
        color: "black",
      }}
    >
      {/**TODO check if this is necessary*/}
      {/*       <h2>Recomendaciones del mes</h2>
      <Box
        margin={"auto"}
        width={1000}
        display={"flex"}
        justifyContent={"space-around"}
      >
        {dataDummy.map((r) => (
          <RecommendationCard
            key={r.id}
            recommendationImage={r.image_url}
            title={r.title}
            description={r.description}
            productName={r.product ? r.product.name : ""}
            subscriptionId={r.subscription_id}
          />
        ))}
      </Box> */}
      <Box>
        <Box className="display-container-btn" mb={5}>
          <Chip
            className={`chip-element ${showModal ? "chip-active" : ""}`}
            onClick={handleCreateRecommendation}
            label={"Crear recomendación"}
          ></Chip>
          <Chip
            className={`chip-element ${!showModal ? "chip-active" : ""}`}
            onClick={handleShowRecommendation}
            label={"Ver recomendaciones"}
          ></Chip>
        </Box>

        <Box>
          {showModal ? (
            <Box width={900} m={"auto"}>
              <CreateRecommendationForm
                onCreate={handleCreate}
                onClose={() => setShowModal(false)}
              />
            </Box>
          ) : (
            <div>
              {/**TODO pass the real data  */}
              <RecommendationTable data={recommendations} onSave={handleSave} />
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RecomendacionesPage;
