import styles from '../styles/racas.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Head from 'next/head'
import Image from 'next/image'
import infoIcon from '../assets/info.png'

export default function Home(){
    const [imgUrl, setImgUrl] = useState("");
    const [nome, setNome] = useState("0");
    const [altura, setAltura] = useState("0");
    const [peso, setPeso] = useState("0");
    const [origem, setOrigem] = useState("0");
    const [tempovida, setTempovida] = useState("0");
    const [infoVisible, setInfoVisible] = useState("none");
    const [listItems, setListItems] = useState();
    

    const key = "f0ccfff3-cda6-4cf8-a3df-5bc0f465dcd5";
    var headers = new Headers();
    headers.append("x-api-key", key);
    
    var Init = { method: 'GET',
                   headers: headers,
                   mode: 'cors',
                   cache: 'default' };

    const URL_TO_FETCH = "https://api.TheDogAPI.com/v1/breeds";
    const IMAGE_URL_TO_FETCH = "https://api.TheDogAPI.com/v1/images/search?breed_ids=";

    const stylesheet = {
        img: {
            objectPosition: "center center",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            objectFit: "contain",
            backgroundSize: "cover",
            backgroundImage: "URL(" + imgUrl + ")",
        },
        
        infoBox: {
            display: infoVisible,
        },

        infoTitulos: {
            textAlign: "left",
        },

        infoItens: {
            textAlign: "center",
        },

        infoRow: {
            margin: "0",
        },

        infoCol1: {
            flex: "1"
        },

        infoCol2: {
            flex: "2"
        },

    }

    useEffect(() => {
        populateList()
        updateImgUrl(1);
    }, []);

    function toogleInfoBox(){
        let toogle = infoVisible;
        if(toogle == "none"){
            toogle = "block";
        }else{
            toogle = "none";
        }
        setInfoVisible(toogle);
    }
    
    function populateList(){
            fetch(URL_TO_FETCH, Init)
              .then(function (response) {
                response.json().then(function (data) {
                    console.log(data);
                        let content = 
                        <div>
                        {data.map((element) => 
                            <li key={element.id}>
                                <button onClick={()=>updateImgUrl(element.id)} className={styles.items}>
                                    {element.name} 
                                </button>   
                            </li>
                        )}
                        </div>
                        console.log(content);
                        setListItems(content);
                });
              })
              .catch(function (err) {
                console.error("Erro", err);
              });
    }

    function updateImgUrl(id){
        const url = IMAGE_URL_TO_FETCH + id;
        fetch(url, Init)
          .then(function (response) {
            response.json().then(function (data) {
              console.log(data);
                setImgUrl(data[0].url);
                setNome(data[0].breeds["0"].name);
                setPeso(data[0].breeds["0"].weight.metric);
                setTempovida(data[0].breeds["0"].life_span);
                setAltura(data[0].breeds["0"].height.metric);
                if (data[0].breeds["0"].origin == undefined) {
                    setOrigem("Origem desconhecida");
                }else{
                    setOrigem(data[0].breeds["0"].origin);
                }
                
              });
          })
          .catch(function (err) {
            console.error("Erro", err);
          });
        
    }   

    return  <div className={styles.container}>
                <Head>
                    <title>Raças</title>
                </Head>
                <div id="navbar" className={styles.navbar}></div>
                <Container fluid>
                    <Row>
                        <Col className={styles.col1}>
                            <Row>
                                <h1 className={styles.title}>
                                    Raças
                                </h1>
                            </Row>
                            <Row className={styles.buttons}>
                                    <ul className={styles.list} id="lista">
                                        {listItems}
                                    </ul>
                            </Row>
                        </Col>
                        <Col className={styles.col2} style={stylesheet.img}>
                            <Row className={styles.info}>
                               <div >
                                    <button className={styles.infoButton} onClick={()=>toogleInfoBox()}>
                                        <Image src={infoIcon} className={styles.infoImg} layout='fixed'  width={75} height={75}></Image>
                                    </button>
                                </div>
                            </Row>
                            <Row className={styles.space}>
                                
                            </Row>
                            <Row className={styles.infoBox} style={stylesheet.infoBox}>
                               <Row style={stylesheet.infoRow}>
                                    <h5>{nome}:</h5>
                                    <Col style={stylesheet.infoCol1}>
                                    <ul className={styles.infoLista} style={stylesheet.infoTitulos}>
                                    
                                    <li>Altura: </li>
                                    <li>Peso: </li>
                                    <li>Tempo de vida: </li>
                                    <li>Origem: </li>
                                    </ul>
                                    </Col>
                                    <Col style={stylesheet.infoCol2}>
                                    <ul className={styles.infoLista} style={stylesheet.infoItens}>
                                    <li>{altura}cm</li>
                                    <li>{peso}kg</li>
                                    <li>{tempovida}</li>
                                    <li>{origem}</li>
                                    </ul>
                                    </Col>
                               </Row>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>


    
}