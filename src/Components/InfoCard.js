import { Card, Row, Progress, Col } from "antd";
import {
  ToolOutlined,
  CarOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  MobileOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import styles from "../styles/Info.module.css";

export default function InfoCard(
  props = [extra, proceso, orden, linea, placa, color,porcentaje, pagadam, estado, tipo]
) {
  //Escoger el color del header de las tarjetas dependiendo de cual sea la tarjeta
  const colorHeader = () => {
    if (props.proceso === "Terminada") {
      return "#03872D";
    } else if (props.proceso === "En proceso") {
      return "#E0C101";
    } else if(props.proceso === "Pagada" || props.pagada === "T") {
      return "#0A62D5";
    }
  };

  //Escoger el Icono a enseñar dependiendo de cual sea la tarjeta
  const IconHeader = () => {
    if (props.proceso === "Terminada") {
      return (
        <CarOutlined
          style={{
            fontSize: "60px",
            color: "#03872D",
          }}
        />
       
      );
    } else if(props.proceso === "Pagada" || props.pagada === "T"){
      if(props.tipo === null){
      return (
        <DollarCircleOutlined
          style={{
            fontSize: "60px",
            color: "#0A62D5",
          }}
        />
      );
    } else if(props.tipo === "quiosco"){
      return (
        <MobileOutlined
          style={{
            fontSize: "60px",
            color: "#0A62D5",
          }}
        />
      );
    } else if(props.tipo === "pago_web"){
      return (
        <GlobalOutlined
          style={{
            fontSize: "60px",
            color: "#0A62D5",
          }}
        />
      );
    }
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
    if (props.proceso == "En proceso") {
      return (
        <>
        <Row align="middle" justify="center" style={{height:"100%", justifyContent:"center", display:"flex"}}>
          <Progress
            percent={props.porcentaje}
            type="dashboard"
            size={60}
            status="normal"
            style={{ fontWeight: "700"}}
            strokeColor="#E4C501"
            strokeWidth={12}

          />
        </Row>
        <Row align="middle" justify="center" style={{height:"100%", justifyContent:"center", display:"flex"}}>
          <label className={styles.labelEstadoStyle} style={{fontSize:"calc(0.3rem + 0.3vw)", textAlign:"center", width:"85px", maxWidth:"85px"}}>{props.estado}</label>
        </Row>
        </>

      );
    } else {
      return (
        <>
        <Row align="middle" justify="center" style={{height:"100%", justifyContent:"center", display:"flex"}}>

          <IconHeader></IconHeader>
          </Row>
         <Row align="middle" justify="center" style={{height:"100%", width:"100%", marginTop:"5px", justifyContent:"center", display:"flex"}}>
         <label className={styles.labelEstadoStyle}  style={{fontSize:"calc(0.3rem + 0.3vw)", textAlign:"center", width:"85px", maxWidth:"85px"}}>{props.estado}</label>
       </Row>
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
          padding: "8px",
          height:"70%"

        }}
        headStyle={{
          backgroundColor: colorHeader(),
          width:"auto",
          height:"auto",
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
            <Row >
              <label className={styles.labelPlacaStyle}>{props.placa}</label>
            </Row>
            <Row align="middle" className={styles.rowLineaStyle}>
              <label className={styles.labelLineaStyle}>
                {props.linea}
                <ColorCar></ColorCar>
              </label>
            </Row>
          </Col>
          <Col style={{width:"100%"}}>
            <ProgressCheck />
          </Col>
        </Row>
      </Card>
    </>
  );
}
