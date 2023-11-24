"use client";
import { Box, Chip } from "@mui/material";
import RecommendationCard from "../../components/admin/adminRecommendation/RecommendationCard";
import RecommendationTable from "../../components/admin/adminRecommendation/RecommendationTable";
import CreateRecommendationForm from "../../components/admin/adminRecommendation/CreateRecommendationForm";
import { useState, useEffect } from "react";
import {
  getAllRecommendations,
  SaveRecommendation,
  UpdateRecommendation,
} from "../../services/recommendation";
import Swal from "sweetalert2";
import "./recommendation.scss";

const RecomendacionesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  //set the recommendation data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.log("Error fetching subscriptions");
      }
    };

    fetchData();
  }, []);

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
    console.log("Data send: " + formData);
    try {
      console.log(formData);
      const response = await SaveRecommendation(JSON.stringify(formData));

      if (response.status === 200) {
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
          ...prevRecommendations,
          response.data,
        ]);
      } else if (response.status !== 200) {
        const error = Object.keys(response.response.data).reduce(
          (acc, key) => `${acc}${response.response.data[key]}\n`,
          "",
        );
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
      }
    } catch (error) {
      console.error("Error creating recommendation:", error);
    }
  };

  const handleSave = async (formData, id) => {
    console.log(formData, id);
    try {
      const response = await UpdateRecommendation(formData, id);

      if (response.status === 200) {
        Swal.fire({
          title: "Recomendación actualizada",
          text: "Recomendacion con id: " + id + " actualizada exitosamente",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
        // Update local state by adding the edited recommendation
        setRecommendations((prevRecommendations) =>
          prevRecommendations.map((rec) =>
            rec.id === id ? { ...rec, ...formData } : rec,
          ),
        );
      } else if (response.status !== 200) {
        const error = Object.keys(response.response.data).reduce(
          (acc, key) => `${acc}${response.response.data[key]}\n`,
          "",
        );
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
      }
    } catch (error) {
      console.error("Error editing recommendation:", error);
    }
  };

  return (
    <Box
      sx={{
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
              <RecommendationTable data={recommendations} onSave={handleSave} />
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RecomendacionesPage;
