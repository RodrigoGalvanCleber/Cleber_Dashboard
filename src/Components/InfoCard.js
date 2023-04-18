import { Card, Row, Progress, Col } from "antd";
import {
  ToolOutlined,
  CarOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import styles from "../styles/Info.module.css";

export default function InfoCard(
  props = [extra, proceso, orden, linea, placa, color]
) {
  //Escoger el color del header de las tarjetas dependiendo de cual sea la tarjeta
  const colorHeader = () => {
    if (props.proceso === "terminado") {
      return "#03872D";
    } else if (props.proceso === "proceso") {
      return "#E0C101";
    } else {
      return "#0A62D5";
    }
  };

  //Escoger el Icono a enseñar dependiendo de cual sea la tarjeta
  const IconHeader = () => {
    if (props.proceso == "terminado") {
      return (
        <CarOutlined
          style={{
            fontSize: "50px",
            color: "#03872D",
          }}
        />
      );
    } else if (props.proceso == "proceso") {
      return (
        <ToolOutlined
          style={{
            fontSize: "50px",
            color: "#E0C101",
          }}
          size={50}
        />
      );
    } else {
      return (
        <DollarCircleOutlined
          style={{
            fontSize: "50px",
            color: "#0A62D5",
          }}
        />
      );
    }
  };

  //Formatear el texto de color dependiendo si existe la descripcion o no
  function ColorCar() {
    if (props.color != undefined && props.linea != undefined) {
      return <>, {props.color}</>;
    } else if (props.color != undefined) {
      return <>{props.color}</>;
    } else {
      return;
    }
  }

  //Si se ocupa enseñar el progreso o si no un icono
  function ProgressCheck() {
    if (props.proceso == "proceso") {
      return (
        <Progress
          percent={30}
          type="circle"
          size={50}
          style={{ fontWeight: "700" }}
          strokeColor="#E4C501"
          strokeWidth={10}
        />
      );
    } else {
      return (
        <>
          <IconHeader></IconHeader>
        </>
      );
    }
  }

  return (
    <>
      <Card
        title={props.orden}
        className={styles.cardStyle}
        bodyStyle={{
          padding: "12px",
          height: "70%",
        }}
        headStyle={{
          backgroundColor: colorHeader(),
          fontSize: "calc(0.9rem + 0.9vw)",
          fontWeight: "600",
          textAlign: "center",
          color: "#FFFF",
          textShadow: "  0px 2px 3px rgba(0, 0, 0, 0.8)",
          letterSpacing: 2,
          height: "20%",
        }}
      >
        <Row className={styles.cardRowStyle} align="middle">
          <Col className={styles.colStyle}>
            <Row style={{ height: "auto", maxHeight: "20%" }}>
              <label className={styles.labelPlacaStyle}>{props.placa}</label>
            </Row>
            <Row align="middle" className={styles.rowLineaStyle}>
              <label className={styles.labelLineaStyle}>
                {props.linea}
                <ColorCar></ColorCar>
              </label>
            </Row>
          </Col>
          <Col>
            <ProgressCheck />
          </Col>
        </Row>
      </Card>
    </>
  );
}
