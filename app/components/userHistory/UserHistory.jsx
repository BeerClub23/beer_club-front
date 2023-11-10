import React from "react";
import UserData from "../../../public/MockDta";
import "./UserHistory.scss";

const UserHistory = () => {
  const columns = [
    {
      name: "Producto",
    },
    {
      name: "Valor",
    },
    {
      name: "Fecha",
    },
  ];

  return (
    <table>
      <tr className="header_table">
        {columns?.map((column, idx) => {
          return (
            <th
              id="header_table"
              key={idx}
              style={column.name == "Producto" ? { textAlign: "start" } : {}}
            >
              {column.name}
            </th>
          );
        })}
      </tr>
      {UserData?.historial?.map((row, idx) => {
        return (
          <>
            <tr key={idx} className="row_results">
              <td style={{ textAlign: "start" , padding: "10px 10px 10px 0px"}}>
                <span style={{marginRight: "30px"}}>{row.quantity}</span>
                <span>{row.productName}</span>
              </td>
              <td>
                <span>{row.price}</span>
              </td>
              <td>
                <span>{row.date}</span>
              </td>
            </tr>
          </>
        );
      })}
    </table>
  );
};

export default UserHistory;
