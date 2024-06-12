import PropTypes from "prop-types";
import { Box } from "@mui/material";

const ContentWrapper = ({ children }) => (
  <Box sx={{ padding: "20px 50px", overflowX: "hidden" }}>{children}</Box>
);

ContentWrapper.propTypes = {
  children: PropTypes.node,
};

export default ContentWrapper;
