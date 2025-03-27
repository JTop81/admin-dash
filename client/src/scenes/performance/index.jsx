import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "state/api";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";


const Performance = () => {
  const theme = useTheme();

  // values to be sent to the backend
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(20);
  // const [sort, setSort] = useState({});
  // const [search, setSearch] = useState("");
  // const [searchInput, setSearchInput] = useState("");

  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
    // {
    //   // page,
    //   // pageSize,
    //   // sort: JSON.stringify(sort),
    //   // search,
    //   userId,
    // }
    // );

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `${Number(params.value).toFixed(2)}k VNĐ`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="HIỆU SUẤT"
        subtitle="Theo dõi hiệu suất Affiliate ở đây"
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}

          // rowCount={(data && data.total) || 0}
          // rowsPerPageOptions={[20, 50, 100]}
          // pagination
          // page={page}
          // pageSize={pageSize}
          // paginationMode="server"
          // sortingMode="server"
          // onPageChange={(newPage) => setPage(newPage)}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onSortModelChange={(newSortModel) => setSort(...newSortModel)}

          components={{
            ColumnMenu: CustomColumnMenu,
            Toolbar: DataGridCustomToolbar,
          }}

          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch },
          // }}
        />
      </Box>
    </Box>
  );
};

export default Performance;
