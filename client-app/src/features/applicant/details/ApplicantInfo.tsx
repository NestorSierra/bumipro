import React from "react";
import { Applicant } from "../../../models/user";
import {
  Button,
  Chip,
  Icon,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

interface Props {
  applicant: Applicant;
  editMode?: boolean;
}
export default function ApplicantInfo({ applicant, editMode }: Props) {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" fontWeight="bold" marginBottom={2}>
        {applicant.displayName}
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "middle",
          flexDirection: "column",
        }}
      >
        {applicant.phone && applicant.phone !== "" ? (
          <Chip
            size="small"
            icon={<PhoneIcon />}
            label={applicant.mobile}
            style={{ marginLeft: "1em" }}
          />
        ) : (
          <TextField
            label="Phone"
            fullWidth
            variant="outlined"
            style={{ marginBottom: "1.5em" }}
            InputProps={{
              disabled: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Icon component={PhoneIcon} />
                </InputAdornment>
              ),
            }}
          />
        )}
        {applicant.email ? (
          <Chip
            size="small"
            icon={<MailIcon />}
            label={applicant.email}
            style={{ marginLeft: "1em" }}
          />
        ) : (
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            style={{ marginBottom: "1.5em" }}
            InputProps={{
              disabled: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Icon component={MailIcon} />
                </InputAdornment>
              ),
            }}
          />
        )}
      </div>
      {applicant.about ? (
        <Typography variant="body1" marginBottom={2}>
          {applicant.about}
        </Typography>
      ) : (
        <TextField
          id="outlined-multiline-static"
          label="About"
          multiline
          fullWidth
          rows={4}
          InputProps={{
            disabled: true,
          }}
        />
      )}
      {applicant.profession && (
        <>
          <b>Profesion:</b> {applicant.profession}
        </>
      )}
      {applicant.relationshipStatus && (
        <>
          <b>Relationship Status:</b> {applicant.relationshipStatus}
        </>
      )}

      {editMode && (
        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}
        >
          <Button
            component={Link}
            to=""
            variant="contained"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
