"use client";
import { Box } from "@mui/material";
import SubscriptionTable from "../../components/admin/adminSubscription/SubscriptionTable";
import {
  getAllSubscriptions,
  useGetSubscriptions,
} from "../../services/subscriptions";
import { useState, useEffect } from "react";

const SubscripcionesPage = () => {
  const [subscriptions, setSubscriptions] = useState([]); //  use this when the back is update
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSubscriptions();
        setSubscriptions(data);
      } catch (error) {
        setError("Error fetching subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <h2>Suscripciones</h2>
      <SubscriptionTable data={subscriptions} />
    </Box>
  );
};

export default SubscripcionesPage;
