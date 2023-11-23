import React from "react";
import "./UserHistory.scss";

const UserHistory = ({ userData }) => {
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
      name: "Fecha de creación",
    },
    {
      name: "Status",
    },
  ];

  return (
    <table>
      <tr className="header_table">
        {columns?.map((column, idx) => {
          return (
            <th id="header_table" key={idx} style={{ textAlign: "center" }}>
              {column.name}
            </th>
          );
        })}
      </tr>
      {userData?.map((row, idx) => {
        return (
          <>
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
                <span>{row.date}</span>
              </td>
              <td style={{ textAlign: "center" }}>
                <span>{row.paymentStatus}</span>
              </td>
            </tr>
          </>
        );
      })}
    </table>
  );
};

export default UserHistory;
