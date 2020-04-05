import React from "react";
import { Link } from "react-router-dom";

import styles from "./ALink.less";

export const ALink = ({ children, className = '', internal = false, ...props }) => (
  !internal
  ? (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.link} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
  : (
    <Link className={`${styles.link} ${className}`} {...props}>
      {children}
    </Link>
  )
)
