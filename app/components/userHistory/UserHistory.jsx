import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import UserPaymentModal from "../userPaymentModal/UserPaymentModal";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "../../styles/materialThemeFormCheckout";
import "./UserHistory.scss";

const UserHistory = ({ userData, onUpdateTable }) => {
  console.log(userData);

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onUpdateTable();
  };

  const columns = [
    {
      name: "Subscripción",
    },
    {
      name: "N° Factura",
    },
    {
      name: "Valor",
    },
    {
      name: "Fecha de pago",
    },
    {
      name: "Status",
    },
    {
      name: "Pagos",
    },
  ];

  return (
    <>
      <table>
        <thead>
          <tr className="header_table">
            {columns?.map((column, idx) => {
              return (
                <th id="header_table" key={idx} style={{ textAlign: "center" }}>
                  {column.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {userData?.map((row, idx) => {
            return (
              <tr key={idx} className="row_results">
                <td
                  style={{ textAlign: "center", padding: "10px 10px 10px 0px" }}
                >
                  <span style={{ marginRight: "30px" }}>{row.quantity}</span>
                  <span>{row.description}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span>{row.invoiceNumber}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span>$ {row.amount}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span>{row.paymentDate || row.date}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span>{row.paymentStatus}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <ThemeProvider theme={theme}>
                    {row.paymentStatus === "APROBADO" ? (
                      <Button variant="contained" disabled>
                        PAGADO
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleOpenModal(row.id)}
                      >
                        Pagar
                      </Button>
                    )}
                  </ThemeProvider>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Modal */}
      <UserPaymentModal
        payment={selectedRowData}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default UserHistory;
