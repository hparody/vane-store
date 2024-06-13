import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button, styled } from "@mui/material";
import { useMemo } from "react";

const LinkButton = styled(Button)`
  height: auto;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  align-self: stretch;
  border-radius: 0px;
  font-weight: bold;
  line-height: 1;
  padding: 0px;
`;

const Link = styled(RouterLink)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 0px 20px;
  align-items: center;
  display: flex;
`;

const NavLink = ({ children, to, sx }) => {
  const location = useLocation();

  const isLocationActive = useMemo(
    () => location.pathname === to,
    [location, to]
  );

  return (
    <LinkButton
      color="primary"
      size="large"
      sx={(theme) => ({
        ...sx,
        ...(isLocationActive
          ? {
              borderBottom: `4px solid ${theme.palette.primary.main}`,
              background: "rgba(191,191,191,0.25)",
            }
          : {}),
      })}
    >
      <Link to={to}>{children}</Link>
    </LinkButton>
  );
};

NavLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  sx: PropTypes.object,
};
export default NavLink;
