import { useState } from "react";

const SetHamburgerMenuVis = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return { isMenuOpen, setIsMenuOpen };
};

export default SetHamburgerMenuVis;
