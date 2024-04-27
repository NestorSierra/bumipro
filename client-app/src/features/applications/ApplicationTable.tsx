import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DataGridEmpty from "../../app/common/datagrid/DataGridEmpty";

export default observer(function ApplicationTable() {
  const { applicationStore } = useStore();
  const {
    loadingInitial,
    loadApplications,
    applicationsByDate,
    applicationsRegistry,
    pagination,
  } = applicationStore;

  useEffect(() => {
    if (applicationsRegistry.size <= 0) loadApplications();
  }, [applicationsRegistry, loadApplications]);

  const columns: GridColDef[] = [
    {
      field: "applicantName",
      headerName: "Applicant",
      flex: 1,
    },
    {
      field: "propertyAddress",
      headerName: "Property",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      flex: 1,
    },
    {
      field: "Details",
      headerName: "",
      sortable: false,
      filterable: false,
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            size="small"
            component={Link}
            to={`/applications/${params.row.referenceNumber}`}
          >
            Details
          </Button>
        );
      },
    },
  ];

  if (loadingInitial)
    return <LoadingComponent content="Loading applications..." />;

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader>
        <Typography component="h4" fontWeight="bold">
          Applications
        </Typography>
      </CardHeader>
      <CardContent>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.referenceNumber}
            rows={applicationsByDate}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  page: pagination?.currentPage! - 1,
                  pageSize: pagination?.itemsPerPage,
                },
              },
            }}
            slots={{
              noRowsOverlay: () => (
                <DataGridEmpty message="There are no applications to show" />
              ),
            }}
            pageSizeOptions={[5, 10, 25]}
          ></DataGrid>
        </Box>
      </CardContent>
    </Card>
  );
});
``