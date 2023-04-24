import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import {
  ToolOutlined,
  CarOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import styles from "../styles/Steps.module.css";

export default function StepsHeader(
  props = [procesoCount, terminadoCount, pagadoCount]
) {
  const [anim, setAnim] = useState(false); //Animacion de iconos
  let startAnim = false; //Estado inicial de animacion

  useEffect(() => {
    //Metodo que corre cada vez que se tiene que actualizar la animacion
    function getData() {
      startAnim = !startAnim;
      setAnim(startAnim);
    }
    getData();
    //Cambiar estado de animacion cada x segundos
    const interval = setInterval(() => getData(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Steps
      style={{ overflow: "visible" }}
      items={[
        {
          description: (
            <label className="globalStepsText">{props.procesoCount}</label>
          ),
          status: "finished",
          icon: (
            <ToolOutlined
              style={{
                color: "#E0C101",
                fontSize: "100px",
                overflow: "visible",
                paddingLeft: "40px",
              }}
              className={anim ? styles.wobbleHorBottom : null}
            />
          ),
        },
        {
          description: (
            <label className="globalStepsText">{props.terminadoCount}</label>
          ),
          status: "finished",
          icon: (
            <CarOutlined
              style={{
                color: "#03872D",
                fontSize: "100px",
              }}
              className={anim ? styles.heartbeat : null}
            />
          ),
        },
        {
          description: (
            <label className="globalStepsText">{props.pagadoCount}</label>
          ),
          status: "finished",
          icon: (
            <DollarCircleOutlined
              style={{
                color: "#0A62D5",
                fontSize: "100px",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
              className={anim ? styles.bounceTop : null}
            />
          ),
        },
      ]}
    />
  );
}
