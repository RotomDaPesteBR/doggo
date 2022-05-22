import styles from '../styles/index.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Head from 'next/head'

export default function Home(){
    const [imgUrl, setImgUrl] = useState("");
    const key = "f0ccfff3-cda6-4cf8-a3df-5bc0f465dcd5";
    var headers = new Headers();
    headers.append("x-api-key", key);
    
    var Init = { method: 'GET',
                   headers: headers,
                   mode: 'cors',
                   cache: 'default' };

    const URL_TO_FETCH = "https://api.thedogapi.com/v1/images/search";

    const stylesheet = {
        img: {
            objectPosition: "center center",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            objectFit: "contain",
            backgroundSize: "cover",
            backgroundImage: "URL(" + imgUrl + ")"
        }
    }

    useEffect(() => {
        updateImgUrl();
    }, []);
    
    function updateImgUrl(){
            fetch(URL_TO_FETCH, Init)
              .then(function (response) {
                response.json().then(function (data) {
                  console.log(data);
                    setImgUrl(data["0"].url);
                  });
              })
              .catch(function (err) {
                console.error("Erro", err);
              });
            
    }
    return  <div className={styles.container}>
                <Head>
                    <title>Listagem</title>
                </Head>
                <div id="navbar" className={styles.navbar}></div>
                <Container fluid>
                    <Row>
                        <Col className={styles.col1}>
                            <Row>
                                <h1 className={styles.title}>
                                    The Dog Api
                                </h1>
                            </Row>
                            <Row className={styles.buttons}>
                                    <ul className={styles.list}>
                                        <li>
                                            <button onClick={()=>updateImgUrl()} className={styles.items}>
                                                Gerar Cachorro
                                            </button>
                                        </li>
                                        <li><a href='./listagem' className={styles.itemstext}><button className={styles.items}>Listagem</button></a></li>
                                        <li><a href='./racas' className={styles.itemstext}><button className={styles.items}>Raças</button></a></li>
                                        <li><a href='./categorias' className={styles.itemstext}><button className={styles.items}>Categorias</button></a></li>
                                    </ul>
                            </Row>
                        </Col>
                        <Col className={styles.col2} style={stylesheet.img}>
                               
                            
                        </Col>
                    </Row>
                </Container>
            </div>


    
}