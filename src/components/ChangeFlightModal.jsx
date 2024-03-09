import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

const ChangeFlightModal = ({
  open = true,
  handleClose = () => {
    console.log("modal");
  },
  data = [1, 2, 3, 4, 5],
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modal Slideshow</DialogTitle>
      <DialogContent>
        {/* Display current slide */}
        <div>{data[currentSlide]}</div>
        {/* Buttons for navigating slides */}
        <Button onClick={handlePrevSlide}>Previous</Button>
        <Button onClick={handleNextSlide}>Next</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeFlightModal;
