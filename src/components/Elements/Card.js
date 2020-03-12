import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Card({ path, img, title, type }) {
  const [hover, setHover] = useState(false);
  const effect = {
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  };
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      className="column card-column has-background-primary is-two-fifths"
    >
      <Link to={path}>
        <p className="type">{type}</p>

        <p class="title has-text-white-ter">{title}</p>
        <img src={img} alt="Image" />
      </Link>
    </motion.div>
  );
}
