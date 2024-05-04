import React, { useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandle = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, toggleHandle };
};

export default useToggle;
