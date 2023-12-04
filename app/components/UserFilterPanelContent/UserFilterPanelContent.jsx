import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetSubscriptions } from "@/app/services/subscriptions";
import "./UserFilterPanelContent.scss";

export default function UserFilterPanelContent({ users }) {
  const { subscriptions } = useGetSubscriptions();

  const columns = [
    { field: "col1", headerName: "Id", width: 15 },
    { field: "col2", headerName: "Apellido", width: 150 },
    { field: "col3", headerName: "Nombre", width: 150 },
    { field: "col4", headerName: "Fecha Suscripción", width: 150 },
    { field: "col5", headerName: "Pais", width: 150 },
    { field: "col6", headerName: "Suscripción", width: 150 },
    { field: "col7", headerName: "Rol", width: 100 },
    { field: "col8", headerName: "Estado", width: 100 },
  ];

  const getSubscriptionName = (id) => {
    const foundSubsc = subscriptions.find((item) => item.id === id);
    return foundSubsc ? foundSubsc.name : "Sin suscripción";
  };
  const reducedArray = users.map((user) => {
    return {
      id: user.id,
      col1: user.id,
      col2: user.lastName,
      col3: user.firstName,
      col4: user.subscriptionDate,
      col5: user.address?.country,
      col6: getSubscriptionName(user.subscriptionId),
      col7: user.role,
      col8: user.active ? "Activo" : "Inactivo",
    };
  });
  console.log(subscriptions);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        className="userDataTable"
        rows={reducedArray}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
