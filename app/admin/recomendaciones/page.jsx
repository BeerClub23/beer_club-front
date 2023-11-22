"use client";
import { Box, Chip } from "@mui/material";
import RecommendationCard from "../../components/admin/adminRecommendation/RecommendationCard";
import RecommendationTable from "../../components/admin/adminRecommendation/RecommendationTable";
import CreateRecommendationForm from "../../components/admin/adminRecommendation/CreateRecommendationForm";
import { useState } from "react";
import Swal from "sweetalert2";

//Delete when the real data is available
const dataDummy = [
  {
    id: 123,
    title: "Sample Title",
    description: "Sample Description",
    createDate: "2023-11-19",
    product: {
      id: 456,
      name: "Sample Product 1",
      description: "Sample Product Description 1",
      image_url: [
        {
          url: "https://example.com/image1_1.jpg",
        },
        {
          url: "https://example.com/image1_2.jpg",
        },
      ],
    },
    subscription_id: 1,
    image_url:
      "https://media.istockphoto.com/id/1040303026/es/foto/cerveza-en-vasos.jpg?s=612x612&w=0&k=20&c=1u_gezlA_8jqCxtMjMJSc1Q07wDvUyMvbXgp4NDeeqQ=",
  },
  {
    id: 124,
    title: "Sample Title 2",
    description: "Sample Description 2",
    createDate: "2023-11-20",
    product: {
      id: 457,
      name: "Sample Product 2",
      description: "Sample Product Description 2",
      image_url: [
        {
          url: "https://example.com/image2_1.jpg",
        },
        {
          url: "https://example.com/image2_2.jpg",
        },
      ],
    },
    subscription_id: 2,
    image_url:
      "https://media.istockphoto.com/id/1040303026/es/foto/cerveza-en-vasos.jpg?s=612x612&w=0&k=20&c=1u_gezlA_8jqCxtMjMJSc1Q07wDvUyMvbXgp4NDeeqQ=",
  },
  {
    id: 125,
    title: "Sample Title 3",
    description: "Sample Description 3",
    createDate: "2023-11-21",
    product: {
      id: 458,
      name: "Sample Product 3",
      description: "Sample Product Description 3",
      image_url: [
        {
          url: "https://example.com/image3_1.jpg",
        },
        {
          url: "https://example.com/image3_2.jpg",
        },
      ],
    },
    subscription_id: 3,
    image_url:
      "https://media.istockphoto.com/id/1040303026/es/foto/cerveza-en-vasos.jpg?s=612x612&w=0&k=20&c=1u_gezlA_8jqCxtMjMJSc1Q07wDvUyMvbXgp4NDeeqQ=",
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
      /*     //const response = await SaveSubscription(JSON.stringify(dataWithoutId));

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
      /*     //const response = await SaveSubscription(JSON.stringify(dataWithoutId));

      //if (response.status === 201) {
        Swal.fire({
          title: "Recomendación creada",
          text: "Nueva recomendación creada exitosamente",
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
      console.error("Error creating recomendation:", error);
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
      <h2>Recomendaciones del mes</h2>
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
      </Box>
      <Box>
        <Box mb={5} display={"flex"}>
          <Chip
            onClick={handleCreateRecommendation}
            label={"Crear recomendación"}
          ></Chip>
          <Chip
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
