import { useCallback, useEffect, useState } from "react";
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
  object-fit: contain;
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
    if (value === "") {
      setInputValue("");
      setSelectedImage("");
    } else {
      setSelectedImage(value);
    }
  }, [value]);

  const handleUpload = useCallback(
    (event) => {
      event.preventDefault();
      setInputValue(event.target.value);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setSelectedImage(reader.result);
        onFileUpload({ name, value: reader.result });
      };
    },
    [name, onFileUpload]
  );

  return (
    <Card
      variant="outlined"
      sx={{
        height: "200px",
        width: "200px",
        display: "flex",
        alignSelf: "center",
      }}
    >
      <CardContent
        sx={{
          padding: "0px !important",
          position: "relative",
          width: "100%",
          height: "100%",
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
          loading="lazy"
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
