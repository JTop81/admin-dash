import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
// import { useGetTransactionsQuery } from "state/api";
import TransactionsChart from "components/TransactionsChart";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data } = useGetDashboardQuery();
  // const { data, isLoading } = useGetDashboardQuery();


  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(20);
  // const [sort, setSort] = useState({});
  // const [search, setSearch] = useState("");

  // const [searchInput, setSearchInput] = useState("");
  // const { data, isLoading } = useGetTransactionsQuery();


  // const columns = [
  //   {
  //     field: "_id",
  //     headerName: "ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "userId",
  //     headerName: "User ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: "CreatedAt",
  //     flex: 1,
  //   },
  //   {
  //     field: "products",
  //     headerName: "# of Products",
  //     flex: 0.5,
  //     sortable: false,
  //     renderCell: (params) => params.value.length,
  //   },
  //   {
  //     field: "cost",
  //     headerName: "Cost",
  //     flex: 1,
  //     renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  //   },
  // ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Thống kê số liệu" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Tải xuống Báo cáo
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Tổng số khách hàng"
          value={data && data.totalCustomers}
          increase="+14%"
          description="so với tháng trước"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Doanh số hôm nay"
          value={data && data?.todayStats?.totalSales}
          increase="+21%"
          description="so với hôm qua"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Doanh số tháng"
          value={data && data?.thisMonthStats?.totalSales}
          increase="+5%"
          description="so với tháng trước"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Danh số năm"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="so với năm trước"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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

          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          {/* <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}

            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            
          /> */}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Danh sách giao dịch
          </Typography>
          <TransactionsChart isDashboard={true} />



        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Doanh số theo danh mục
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Bảng phân tích trạng thái thực tế và thông tin qua danh mục doanh thu thực hiện cho năm nay và tổng doanh thu.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
