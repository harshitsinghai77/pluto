import { useEffect } from "react";
import Hero from "../../components/Hero";
import { Row, Col, Typography } from "antd";

import nst_img from "./../../static/nst_example.png";
import "./about.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero
        title="About"
        subtitle="Pluto 🎨 uses Deep Neural Network to style transfer your image.
          We chose among some of the most representative artists around the world to train our network."
      />

      <div className="about_container">
        <Row className="about_mainTitle">
          <Typography.Title level={2}>
            Neural style transfer (NST)
          </Typography.Title>
        </Row>
        <Row justify="center">
          <Col md={18} className="about_margin_bottom">
            <Typography.Title level={5}>
              Neural style transfer is an optimization technique used to take
              two images—a content image and a style reference image (such as an
              artwork by a famous painter)—and blend them together so the output
              image looks like the content image, but “painted” in the style of
              the style reference image.
            </Typography.Title>
          </Col>
        </Row>

        <Row justify="center">
          <Col md={18}>
            <img className="about_img" src={nst_img} alt="Unstyle" />
          </Col>
        </Row>

        <Row justify="center">
          <Col md={16} className="about_margin_bottom">
            <Typography.Title level={5}>
              This is implemented by optimizing the output image to match the
              content statistics of the content image and the style statistics
              of the style reference image. These statistics are extracted from
              the images using a convolutional neural network.
            </Typography.Title>
          </Col>
        </Row>
      </div>
      <Hero
        title="About"
        subtitle="Convert your favorite shot into any famous artistic painting using Pluto's AI."
      />
    </>
  );
}

export default About;
