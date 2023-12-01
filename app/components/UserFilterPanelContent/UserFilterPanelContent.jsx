import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function UserFilterPanelContent({ users }) {
  console.log(users);
  const rowLength = users.length;
  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns = [
    { field: "col1", headerName: "Id", width: 150 },
    { field: "col2", headerName: "Nombre", width: 150 },
    { field: "col3", headerName: "Apellido", width: 150 },
    { field: "col4", headerName: "Fecha Suscripcion", width: 150 },
    { field: "col5", headerName: "Pais", width: 150 },
    { field: "col6", headerName: "Rol", width: 150 },
    { field: "col7", headerName: "Estado", width: 150 },
  ];

  const reducedArray = users.map((user) => {
    return {
      id: user.id,
      col1: user.id,
      col2: user.firstName,
      col3: user.lastName,
      col4: user.subscriptionDate,
      col5: user.address.country,
      col6: user.role,
      col7: user.active,
    };
  });
 
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={reducedArray}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
