
const useCloseDropdown = () => {
  const handleCloseItem = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  }; // Empty dependency array means this callback doesn't depend on any external variables

  return handleCloseItem;
};

export default useCloseDropdown;
