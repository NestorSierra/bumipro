import {
  Button,
  ButtonGroup,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageWidgetDropzone from "./ImageWidgetDropzone";
import ImageWidgetCropper from "./ImageWidgetCropper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

interface Props {
  loading: boolean;
  uploadImage: (file: Blob) => void;
}

export default function ImageUploadWidget({ loading, uploadImage }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadImage(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <Typography component="h4" color="primary">
          Step 1 - Add Photo
        </Typography>
        <ImageWidgetDropzone setFiles={setFiles} />
      </Grid>
      <Grid item xs={4}>
        <Typography component="h4" color="primary">
          Step 2 - Resize image
        </Typography>
        {files && files.length > 0 && (
          <ImageWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid>
      <Grid item xs={4}>
        <Typography component="h4" color="primary">
          Step 3 - Preview & Upload
        </Typography>
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            ></div>

            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{ marginTop: "10px" }}
            >
              <LoadingButton
                variant="contained"
                size="small"
                color="success"
                onClick={onCrop}
                loading={loading}
                endIcon={<CheckIcon />}
              >
                Confirm{" "}
              </LoadingButton>

              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => setFiles([])}
                endIcon={<CloseIcon />}
                disabled={loading}
              >
                Cancel{" "}
              </Button>
            </ButtonGroup>
          </>
        )}
      </Grid>
    </Grid>
  );
}
