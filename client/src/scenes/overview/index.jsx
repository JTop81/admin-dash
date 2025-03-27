import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="TỔNG QUAN"
        subtitle="Tổng quan về doanh thu và lợi nhuận chung"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Doanh thu</MenuItem>
            <MenuItem value="units">Doanh số</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
