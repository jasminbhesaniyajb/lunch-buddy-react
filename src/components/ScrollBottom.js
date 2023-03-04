import React, { useEffect, useState } from "react";
const PublicScrollBottom = () => {
  const [is_visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      window.addEventListener("scroll", toggleVisibility);
    }
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      isCancelled = true;
    };
  }, []);
  return (
    <React.Fragment>
      {is_visible && (
        <button
          type="button"
          className="scroll-to-top hidden-mobile visible border-0"
          onClick={(e) => scrollToTop(e)}
        >
          <i className="fas fa-chevron-up mt-2"></i>
        </button>
      )}
    </React.Fragment>
  );
};
export default PublicScrollBottom;
