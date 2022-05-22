import styles from '../styles/index.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

function Home() {
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
        },

        topbutton: {
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px"
        },

        bottombutton: {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px"
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
                                            <button onClick={()=>updateImgUrl()} className={styles.items} style={stylesheet.topbutton}>
                                                Gerar Cachorro
                                            </button>
                                        </li>
                                        <li><a href='./listagem' className={styles.itemstext}><button className={styles.items}  >Listagem</button></a></li>
                                        <li><a href='./racas' className={styles.itemstext}><button className={styles.items}>Raças</button></a></li>
                                        <li><a href='./categorias' className={styles.itemstext}><button className={styles.items} style={stylesheet.bottombutton}>Categorias</button></a></li>
                                    </ul>
                            </Row>
                        </Col>
                        <Col className={styles.col2} style={stylesheet.img}>
                               
                            
                        </Col>
                    </Row>
                </Container>
                
                
            </div>
}

export default Home

/*
                import { Swiper, SwiperSlide } from 'swiper/react';
                import { Navigation, Pagination, A11y , Autoplay} from 'swiper';
                import 'swiper/css';
                import 'swiper/css/navigation';
                import 'swiper/css/pagination';
                import 'swiper/css/scrollbar';

                <div className={styles.carousel}>
                <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    loop={true}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide><img src="https://images.hdqwalls.com/download/star-wars-the-rise-of-skywalker-new-5k-rh-1920x1080.jpg" class="d-block w-100" alt="..."/></SwiperSlide>
                    <SwiperSlide><img src="https://cdn.wallpapersafari.com/36/54/NWIj9Y.jpg" class="d-block w-100" alt="..."/></SwiperSlide>
                    <SwiperSlide><img src="https://wallpaperaccess.com/full/1347954.jpg" class="d-block w-100" alt="..."/></SwiperSlide>
                </Swiper>
                </div>*/