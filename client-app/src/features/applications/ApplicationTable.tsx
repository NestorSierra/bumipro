import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

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

  console.log(applicationsByDate);

  const columns: GridColDef[] = [
    {
      field: "applicantName",
      headerName: "Applicant",
      width: 200,
    },
    {
      field: "propertyAddress",
      headerName: "Property",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      width: 100,
    },
    {
      field: "Details",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      editable: false,
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
          pageSizeOptions={[5, 10, 25]}
        ></DataGrid>
      </CardContent>
    </Card>
  );
});
