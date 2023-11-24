import React, { useState, useMemo } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import { SearchOff, SearchOutlined } from "@mui/icons-material";
import RecommendationModal from "./RecommendationModal";
import { useGetSubscriptions } from "../../../services/subscriptions";

// TABLE FUNCTIONS
const getComparator = (order, orderBy) => {
  if (orderBy === "id" || orderBy === "createDate") {
    return order === "desc"
      ? (a, b) => b[orderBy] - a[orderBy]
      : (a, b) => a[orderBy] - b[orderBy];
  } else {
    return order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const visuallyHiddenStyle = { ...visuallyHidden };

// TABLE HEAD (COLUMN NAMES, ID SORT)
const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: "id", label: "ID" },
    { id: "image", label: "Imagen" },
    { id: "title", label: "Titulo" },
    { id: "description", label: "Descripción" },
    { id: "createDate", label: "Fecha de creación" },
    { id: "productName", label: "Producto" },
    { id: "susbscription", label: "Suscripción" },
    { id: "actions", label: "Editar" },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            style={{ visibility: "hidden" }}
            inputProps={{ "aria-label": "spacer" }}
            sx={{ padding: "8px" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="right" padding="normal">
            {headCell.id === "id" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography variant="body1">{headCell.label}</Typography>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHiddenStyle}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography variant="body1">{headCell.label}</Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
// TABLE HEAD (FUNCTIONS, SEARCH)
const EnhancedTableToolbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleClearSearch = () => {
    setShowSearch(!showSearch);
    setSearchTerm("");
    onSearch("");
  };

  return (
    <Toolbar
      sx={{
        justifyContent: "flex-end", // Align to the right
        pr: { xs: 1, sm: 1 },
      }}
    >
      {!showSearch ? (
        <IconButton onClick={handleSearchToggle}>
          <SearchOutlined />
        </IconButton>
      ) : (
        <>
          <InputBase
            variant="outlined"
            placeholder="Titulo o producto"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton onClick={handleClearSearch}>
            <SearchOff />
          </IconButton>
        </>
      )}
    </Toolbar>
  );
};

const RecommendationTable = ({ data, onSave }) => {
  console.log("RecommendationTable rendered");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRowData, setEditingRowData] = useState(null);
  const { subscriptions, isLoading, isError } = useGetSubscriptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const subscription = (id) => subscriptions.find((s) => s.id === id);

  const rows = data;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (row) => {
    setEditingRowData(row);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRowData(null);
  };
  const visibleRows = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return rows.filter((row) => {
      const idMatch = row.id.toString().includes(lowerCaseSearchTerm);

      // Search for title and productName
      const titleMatch = row.title.toLowerCase().includes(lowerCaseSearchTerm);
      const productNameMatch = row.product.name
        .toLowerCase()
        .includes(lowerCaseSearchTerm);

      return idMatch || titleMatch || productNameMatch;
    });
  }, [rows, searchTerm]);

  const emptyRows = useMemo(() => {
    return (
      rowsPerPage -
      Math.min(rowsPerPage, visibleRows.length - page * rowsPerPage)
    );
  }, [visibleRows, rowsPerPage, page]);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar onSearch={handleSearch} />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(visibleRows, getComparator(order, orderBy)).map(
                (row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      borderBottom: "2px solid #e0e0e0",
                      cursor: "default",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        style={{ visibility: "hidden" }}
                        inputProps={{ "aria-label": "spacer" }}
                        sx={{ padding: "8px" }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="normal"
                      align="right"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Avatar alt={row.title} src={row.image_url} />
                      </div>
                    </TableCell>

                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                      {" "}
                      {row.description.length > 50
                        ? `${row.description.substring(0, 50)}...`
                        : row.description}
                    </TableCell>
                    <TableCell align="right">{row.createDate}</TableCell>
                    <TableCell align="right">{row.product.name}</TableCell>
                    <TableCell align="right">
                      {subscription(row.subscription_id).name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditClick(row)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ),
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={visibleRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <RecommendationModal
        editingRowData={editingRowData}
        onClose={handleCloseModal}
        isModalOpen={isModalOpen}
        onSave={onSave}
      />
    </Box>
  );
};

export default RecommendationTable;
