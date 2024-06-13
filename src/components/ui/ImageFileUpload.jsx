import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardContent, styled } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import DefaultImage from "@/assets/default-image.jpg";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Image = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageFileUpload = ({
  name,
  buttonLabel,
  value,
  alt = "",
  onFileUpload,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(value);

  useEffect(() => {
    if (onFileUpload) onFileUpload({ name, value: selectedImage });
  }, [name, selectedImage, onFileUpload]);

  useEffect(() => {
    if (value === "") {
      setInputValue("");
      setSelectedImage("");
    }
  }, [value]);

  const handleUpload = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setSelectedImage(reader.result);
    };
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: "200px",
        height: "200px",
        display: "flex",
        alignSelf: "center",
      }}
    >
      <CardContent
        sx={{
          padding: "0px !important",
          position: "relative",
        }}
      >
        <Button
          component="label"
          variant="contained"
          role={undefined}
          size="small"
          color="primary"
          tabIndex={-1}
          startIcon={<FileUploadIcon fontSize="small" />}
          sx={{
            fontSize: "0.75rem",
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "20px",
            margin: "auto",
            width: "fit-content",
          }}
        >
          {buttonLabel}
          <VisuallyHiddenInput
            name={name}
            value={inputValue}
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />
        </Button>
        <Image
          src={selectedImage === "" ? DefaultImage : selectedImage}
          alt={alt}
        />
      </CardContent>
    </Card>
  );
};

ImageFileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  value: PropTypes.any,
  alt: PropTypes.string,
  onFileUpload: PropTypes.func,
};

export default ImageFileUpload;
