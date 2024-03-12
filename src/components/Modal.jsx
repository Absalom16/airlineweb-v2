// import from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function BasicModal({ children, open, close }) {
  const handleClose = () => close(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{ overflow: "hidden", textAlign: "center" }}
    >
      <DialogTitle>info modal</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
