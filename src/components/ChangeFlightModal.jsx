import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  ButtonGroup,
  Box,
} from "@mui/material";

const buttons = [
  <Button key="one">Cancel flight</Button>,
  <Button key="two">Add passenger</Button>,
  <Button key="three">Change passenger</Button>,
  <Button key="three">Change seats</Button>,
  <Button key="three">Delete passenger</Button>,
];

const CancelFlightModal = ({
  open = true,
  // close,

  // handleClose = () => {
  //   close(false);
  // },
}) => {
  return (
    <Dialog open={open} style={{}}>
      <DialogTitle>Change flight</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="contained"
          >
            {buttons}
          </ButtonGroup>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CancelFlightModal;
