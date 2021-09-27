import { useEffect } from "react";

// This is a custom hook that enables to close the modal
// when the user clicks on anywhere outside the modal.

const useOutsideClick = (ref, callback) => {
  // if click point is not in refered div, do callback.
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    // Add click event listener to the whole document
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;