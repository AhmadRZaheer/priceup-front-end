import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logo from "../../Assets/purplelogo.svg";
import "./MobileNavBar.scss";
import { IconButton } from "@mui/material";

function MobileBar() {
  return (
    <>
      <div className="Main">
        <div className="MenuIcon">
          <MenuRoundedIcon sx={{ fontSize: 40, padding: 1 }} />
        </div>
        <div className="top">
          <span className="logo">
            <img src={Logo} alt="" />
          </span>
        </div>
        <div>
          <IconButton sx={{ borderRadius: "full" }}>
            <SearchOutlinedIcon
              sx={{ fontSize: 40, padding: 0.2, fontWeight: 2, color: "white" }}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default MobileBar;
