import Head from "next/head";
import Image from "next/image";
import { Layout, Row, Carousel, Col, message } from "antd"; //Libreria de componentes
import ContainerCards from "@/Components/ContainerCards";
import InfoCard from "@/Components/InfoCard";
import { useEffect, useState } from "react";
import StepsHeader from "@/Components/StepsHeader"; 
import { useRouter } from "next/router"; //Next.js
import useSWR from "swr"; //Libreria para actualizar datos cada x cantidad de tiempp

const { Header, Content } = Layout;

export default function Home({ initialData = [] }) {
  const [agencia, setAgencia] = useState(null);//ID de agencia en url
  const router = useRouter(); 
  const [dataCards, setData] = useState([]); //Datos de tarjetas de carrusel
  const [json, setJson] = useState([]); //Json de agencia
  const [date, setDate] = useState(); //Fecha actualizacion
  const [procesoCount, setProcesoCount] = useState(0); //Counter de tarjetas proceso
  const [terminadoCount, setTerminadoCount] = useState(0); //Counter tarjetas terminado
  const [pagadoCount, setPagadoCount] = useState(0); //Counter tarjetas pagado
  const [messageApi, contextHolder] = message.useMessage(); //Variable que controla mensajes a desplegar

  //Fetcher para actualizar los datos cada x cantidad de tiempo
  async function fetcher(url) {
    //Si la agencia (ID en url) no es null
    if(agencia !== null){
      //Mensaje de datos cargando
      messageApi.open({
        key: "datos",
        style: { fontSize: "calc(0.5rem + 0.5vw)" },
        type: "loading",
        content: "Actualizando datos..",
        duration: 0,
      });
      try {
        setDate(new Date().toLocaleString()); //Actualizar la fecha
        //Regresar datos de json
        const result = await fetch(url)
          .then((r) => r.json())
          .then((data) => data);
        //Mensaje de datos recuperados
        messageApi.destroy("datos");
        messageApi.success({
          key: "datosActualizados",
          style: { fontSize: "calc(0.5rem + 0.5vw)" },
          type: "loading",
          content: "Datos actualizados correctamente.",
          duration: 2.5,
        });
        return result;  //Retornar el json con todos registros a enseñar
      } catch (e) {
        console.log(e);
      }
   }
  }

  //Metodo fetcher corre cada x cantidad de tiempo con liga a id de agencia y fecha
  const { data } = useSWR(
    `https://hook.integromat.com/evhatg54q5yx0vhj6aw0c3yo492w62ck?IdAgencia=${agencia}&Fecha=2022-03-02`,
    fetcher,
    {
      initialData,
      refreshInterval: 60000,
    }
  );

  //Construir los contenedores cada vez que se cambia la variable
  useEffect(() => {
    constructArray();
  }, [data]);

  //Esperar al router para  id de agencia
  useEffect( () => {
    //Esperar a que router este listo
    if (!router.isReady) return;
    //Fetch de la agencia y su look
    getAgencia();
  }, [router.isReady]);

  //Construir el carrusel 
  async function constructArray() {
    if (data != undefined) {
      const containers = []; //Carruseles
      //Contar cuanto de cada tarjeta hay
      let pCount = 0;
      let tCount = 0;
      let pgCount = 0;
      //Por cada 24 tarjetas hacer carrusel
      for (let i = 0; i < data.length; i += 24) {
        //Dividir json en partes de 24
        let chunk = data.slice(i, i + 24);
        //Agregar a container las tarjetas con su info
        containers.push(
          <ContainerCards key={i}>
            {chunk.map((card, j) => {
              if (card.Estado_Orden === "En proceso") {
                pCount += 1;
              } else if (card.Estado_Orden === "Terminada") {
                tCount += 1;
              } else if (card.Estado_Orden === "Pagada") {
                pgCount += 1;
              }
              return (
                //Props contienen datos de cada registro
                <InfoCard
                  key={card.NumOS}
                  proceso={card.Clasificacion}
                  orden={card.NumOS}
                  linea={card.Linea}
                  placa={card.Placa}
                  color={card.Color}
                  porcentaje={card.PorcentajeAvance}
                  pagada={card.Pagada}
                ></InfoCard>
              );
            })}
          </ContainerCards>
        );
        setPagadoCount(pgCount);
        setTerminadoCount(tCount);
        setProcesoCount(pCount);
      }

      //Set de containers (carruseles)
      setData(containers);
      //Fecha de consulta
      setDate(new Date().toLocaleString() + "");
    }
  }

  //Obtener la agencia del url
  async function getAgencia() {
    let error = false;
    //Mensaje de obtener datos
    messageApi.open({
      key: "agencia",
      style: { fontSize: "calc(0.5rem + 0.5vw)" },
      type: "loading",
      content: "Cargando agencia..",
      duration: 0,
    });
    //Obtener agencia mediante el id en el URL
    const { q } = router.query;
    setAgencia(q); //Set de la agenicia para url de webhook
    try {
      //Obtener datos de agencia
      const res = await fetch(
        `https://hook.integromat.com/sx1pcu1f43nxofq0i88cxpei02t7gc69?IdAgencia=${q}`
      );
      let data = await res.json();
      setJson(data); //Json de agencia
    } catch (e) {
      //Mensaje de error
      error = true;
      messageApi.error({
        key: "d",
        style: { fontSize: "calc(0.5rem + 0.5vw)" },
        type: "loading",
        content: "Datos de agencia no pudieron ser recuperados.",
        duration: 2.5,
      });
    }
    messageApi.destroy("agencia");
    if (error === false) {
      //Si no hubo error enviar mensaje de ok
      messageApi.success({
        key: "datosAgencia",
        style: { fontSize: "calc(0.5rem + 0.5vw)" },
        type: "loading",
        content: "Datos de agencia recuperados.",
        duration: 2.5,
      });
    }
  }

  const ValidImage = () => {
    //Validar si imagen existe o no
    if (json.UrlLogo != undefined) {
      return (
        <Image
          fill
          placeholder="empty"
          alt="Logo de agencia"
          src={json.UrlLogo}
          className="globalImage"
          priority={true}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      );
    } else {
      return;
    }
  };

  return (
    <Layout className="globalLayoutStyle">
      {contextHolder}
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header className="globalHeaderStyle">
        {/*Row es todo el header*/}
        <Row>
          {/*Logo tomando 4 de col*/}
          <Col span={6} style={{ padding: "2%" }}>
            <ValidImage></ValidImage>
          </Col>
          {/*Nombre, fecha y steps*/}
          <Col span={18} style={{ paddingTop: "0", overflow: "visible" }}>
            <Row
              style={{
                alignContent: "center",
                justifyContent: "end",
              }}
            >
              <label
                style={{
                  fontSize: "calc(0.4rem + 0.5vw)",
                  fontWeight: "850",
                  opacity: "70%",
                }}
              >
                Actualizado: {date}
              </label>
            </Row>
            <Row
              style={{ justifyContent: "space-between", overflow: "visible" }}
            >
              <StepsHeader
                procesoCount={procesoCount}
                terminadoCount={terminadoCount}
                pagadoCount={pagadoCount}
              ></StepsHeader>
            </Row>
          </Col>
        </Row>
      </Header>
      {/*Contenido principal*/}
      <Content className="globalH100BTrasparent" style={{ width: "100%" }}>
        <div className="globalH100BTrasparent" style={{ width: "100%" }}>
          {/*Carrusel con tarjetas*/}
          <Carousel
            autoplay
            dots={false}
            style={{ width: "100%" }}
            autoplaySpeed={10000}
            className="globalH100BTrasparent"
          >
            {/*Data contiene los diferentes contenedores con las tarjetas*/}
            {dataCards.map((data) => data)}
          </Carousel>
        </div>
      </Content>
    </Layout>
  );
}
