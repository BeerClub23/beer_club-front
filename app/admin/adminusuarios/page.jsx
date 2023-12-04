"use client";
import { Box } from "@mui/material";
import AdminTable from "../../components/admin/adminCreateUser/AdminTable";
import { useEffect, useState } from "react";
import { getAllAdminUsers } from "../../services/adminUsers";

const SubscripcionesPage = () => {
  const [adminUsers, setAdminUsers] = useState([]); //  use this when the back is update
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAdminUsers();
        setAdminUsers(data);
      } catch (error) {
        setError("Error fetching admin users");
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
      <h2>Usuarios</h2>
      <AdminTable data={adminUsers} />
    </Box>
  );
};

export default SubscripcionesPage;
