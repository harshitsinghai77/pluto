import { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import { Row, Col } from "antd";
import { Typography } from "@material-ui/core";
import CarouselShowcase from "../../components/Carousel";
import axios from "axios";
import "./showcase.css";

function Showcase() {
  const [showcase, setShowcase] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("https://go-deployment.herokuapp.com/img_url")
      .then((res) => {
        const { data } = res;
        setShowcase(data.data);
      })
      .catch((e) => {
        console.log("Some error occured");
      });
  }, []);

  return (
    <>
      <Hero
        title="Showcase"
        subtitle="A cultural voyage to some of the most representatives artists from around the world."
      />
      <Row justify="center">
        <Col md={18}>
          <div className="heading-container">
            <Typography variant={"h3"} className="mainTitle">
              Some Artistic Images made by Pluto
            </Typography>
            <Typography variant={"body1"} className="mainTitle">
              Check out some artistic designs our AI has created....
            </Typography>
          </div>
        </Col>
      </Row>
      <CarouselShowcase imgGallary={showcase} />
      <Hero
        title="Showcase"
        subtitle="With help of AI convert your favorite shot into any famous artistic painting."
      />
    </>
  );
}

export default Showcase;
