import { Children } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(`${path}`);
  };

  return (
    <Paper elevation={3} style={{ height: "100%", textAlign: "center" }}>
      <List>
        {Children.map(children, (child, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleItemClick(child.props.path)}
          >
            <ListItemText primary={child.props.label} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;
