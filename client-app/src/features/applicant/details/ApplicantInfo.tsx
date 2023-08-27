import React from "react";
import { Applicant } from "../../../models/user";
import { Chip, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";

interface Props {
  applicant: Applicant;
}
export default function ApplicantInfo({ applicant }: Props) {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" fontWeight="bold" marginBottom={2}>
        {applicant.displayName}
      </Typography>
      <div style={{ display: "flex", alignItems: "middle" }}>
        {applicant.phone && applicant.phone !== "" && (
          <Chip
            size="small"
            icon={<PhoneIcon />}
            label={applicant.mobile}
            style={{ marginLeft: "1em" }}
          />
        )}
        {applicant.email && (
          <Chip
            size="small"
            icon={<MailIcon />}
            label={applicant.email}
            style={{ marginLeft: "1em" }}
          />
        )}
      </div>
      {applicant.about && (
        <Typography variant="body1" marginBottom={2}>
          {applicant.about}
        </Typography>
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
    </div>
  );
}
