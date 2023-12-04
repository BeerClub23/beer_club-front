import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import { SearchOff, SearchOutlined } from "@mui/icons-material";
import { UpdateAdminUsers, SaveAdminUser } from "../../../services/adminUsers";
import Swal from "sweetalert2";
import AdminUsersModal from "../adminCreateUser/AdminUsersModal";
import "../adminSubscription/subscriptionAdmin.scss";

// TABLE FUNCTIONS

const getComparator = (order, orderBy) => {
  if (orderBy === "id") {
    return order === "desc" ? (a, b) => b.id - a.id : (a, b) => a.id - b.id;
  }
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
// TABLE HEAD (COLUMN NAMES, ID SORT)
const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const keys = ["id", "Nombre", "Last Name", "Email", "Estatus"];

  const headCells = keys.map((key) => ({
    id: key,
    numeric: key === "id" ? false : true,
    padding: "normal",
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

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
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.id === "name" ? "normal" : "none"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === "id" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
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
        <TableCell />
      </TableRow>
    </TableHead>
  );
};
// TABLE HEAD (FUNCTIONS, CREATE, FILTER, SEARCH)
const EnhancedTableToolbar = ({ onSearch, onAdd, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

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

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setActiveFilter(filterValue);
    onFilterChange(filterValue);
  };

  return (
    <Toolbar
      sx={{
        justifyContent: "space-around",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Box sx={{ flex: "1 1 45%" }}>
        <Button
          className={"add-element-btn"}
          variant="outlined"
          onClick={onAdd}
        >
          + Crear Usuario
        </Button>
      </Box>
      {/* Add filter dropdown or toggle button */}
      <Box sx={{ flex: "1 1 20%" }}>
        <Select
          value={activeFilter !== null ? activeFilter : ""}
          onChange={handleFilterChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="true">Activo</MenuItem>
          <MenuItem value="false">Inactivo</MenuItem>
        </Select>
      </Box>
      {!showSearch ? (
        <IconButton onClick={handleSearchToggle}>
          <SearchOutlined />
        </IconButton>
      ) : (
        <>
          <InputBase
            variant="outlined"
            placeholder="Buscar por ID o nombre"
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

const AdminTable = (props) => {
  console.log("AdminTable rendered");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRowData, setEditingRowData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [adminUsers, setAdminUsers] = useState([]); // Local state

  useEffect(() => {
    // Update the state
    setAdminUsers(props.data);
  }, [props.data]);

  // SUBSCRIPTION INFO
  const rows = adminUsers;

  // TABLE HEAD FUNCTIONS
  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
  };

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
  // CRUD OPERATIONS

  //Create element
  const handleAddClick = () => {
    setEditingRowData(null); // for create mode
    setEditModalOpen(true);
  };

  const handleCreate = async (formData) => {
    try {
      const { id, ...dataWithoutId } = formData;
      const response = await SaveAdminUser(JSON.stringify(dataWithoutId));

      if (response.status === 201) {
        Swal.fire({
          title: "Usuario creado",
          text: "Nuevo usuario creado exitosamente",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#ceb5a7",
          focusConfirm: false,
        });
        // Update local state by adding the new subscription
        setAdminUsers((prevUser) => [...prevUser, response.data]);
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
      console.error("Error creating subscription:", error);
    }
  };

  //Edit element
  const handleEditClick = (row) => {
    setEditingRowData(row);
    setEditModalOpen(true);
  };

  const handleEditSave = async (editedData, id) => {
    let data = JSON.stringify(editedData);
    {
      console.log(data);
    }
    let response = await UpdateAdminUsers(data, id);
    if (response.status === 200) {
      Swal.fire({
        title: "Usuario actualizado",
        text: `Usuario con id: ${id} actualizado exitosamente`,
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#ceb5a7",
        focusConfirm: false,
      });
      setAdminUsers((prevUser) =>
        prevUser.map((s) => (s.id === id ? editedData : s))
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
  };

  const handleSave = (formData, id) => {
    if (!formData) {
      console.error("formData is null or undefined");
      return;
    }

    if (editingRowData) {
      handleEditSave(formData, id);
    } else {
      handleCreate(formData);
    }
    setEditModalOpen(false);
  };

  const handleIsActiveUpdate = async (row) => {
    const updatedRow = {
      ...row,
      active: !row.active,
    };
    console.log(updatedRow);
    try {
      let response = await UpdateAdminUsers(updatedRow, row.id);
      if (response.status === 200) {
        setAdminUsers((prevUsers) => {
          return prevUsers.map((s) => (s.id === row.id ? updatedRow : s));
        });
        console.log("Successful update");
      } else {
        console.log("Failed update");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        row.id.toString().includes(searchTerm) ||
        row.name.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeFilter === "") {
        return matchesSearch;
      } else if (activeFilter === "true") {
        return matchesSearch && row.active;
      } else if (activeFilter === "false") {
        return matchesSearch && !row.active;
      }
    });
  }, [rows, searchTerm, activeFilter]);

  const visibleRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [filteredRows, order, orderBy, page, rowsPerPage],
  );
  const emptyRows = useMemo(() => {
    // Calculate the number of empty rows based on the filtered data
    return (
      rowsPerPage -
      Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage)
    );
  }, [filteredRows, rowsPerPage, page]);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          onSearch={handleSearch}
          onAdd={handleAddClick}
          onFilterChange={handleFilterChange}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    tabIndex={-1}
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
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      {row.active ? (
                        <Chip
                          className={"chip-element active-chip"}
                          label={"activo"}
                          onClick={() => handleIsActiveUpdate(row)}
                        ></Chip>
                      ) : (
                        <Chip
                          className={"chip-element"}
                          label={"inactivo"}
                          onClick={() => handleIsActiveUpdate(row)}
                        ></Chip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <AdminUsersModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        rowData={editingRowData}
      />
    </Box>
  );
};

export default AdminTable;
