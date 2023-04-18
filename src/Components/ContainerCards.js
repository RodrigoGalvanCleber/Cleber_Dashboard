import React from "react";
import styles from "../styles/Container.module.css";

export default function ContainerCards({ children }) {
  //Contendor de tarjetas para carrusel
  return (
    <div className={styles.divStyle} style={{ width: "100%" }}>
      {children}
    </div>
  );
}
