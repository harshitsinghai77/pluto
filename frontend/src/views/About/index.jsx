import { makeStyles } from "@material-ui/core/styles";
import Hero from "../../components/Hero";
import { Row, Col, Typography as Typography2, Button } from "antd";
import { Container, Typography } from "@material-ui/core";

import nst_img from "./../../static/nst_example.png";
import "./about.css";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    margin: "48px 0 24px",
  },
  mainText: {
    margin: "12px 0",
  },
  container: {
    margin: "30px 0",
  },
  img: {
    maxHeight: "300px",
    maxwidth: "100%",
  },
}));

function About() {
  return (
    <>
      <Hero
        title="About"
        subtitle="Neuro Art🎨 uses Machine Learning to style transfer the artist’s 
          technique.We chose among some of the most representative artists around the world to train our network."
      />

      <div className="about_container">
        <Row className="about_mainTitle">
          <Typography variant="h3">Neural style transfer (NST)</Typography>
        </Row>
        <Row justify="center">
          <Col md={18} className="about_margin_bottom">
            <Typography className="about_mainText">
              Neural style transfer is an optimization technique used to take
              two images—a content image and a style reference image (such as an
              artwork by a famous painter)—and blend them together so the output
              image looks like the content image, but “painted” in the style of
              the style reference image.
            </Typography>
          </Col>
        </Row>

        <Row justify="center">
          <Col md={18}>
            <img className="about_img" src={nst_img} alt="Unstyle" />
          </Col>
        </Row>

        <Row justify="center">
          <Col md={16} className="about_margin_bottom">
            <Typography>
              This is implemented by optimizing the output image to match the
              content statistics of the content image and the style statistics
              of the style reference image. These statistics are extracted from
              the images using a convolutional network.
            </Typography>
          </Col>
        </Row>
      </div>
      <Hero
        title="About"
        subtitle="With help of AI convert your favorite shot into a famous artist’s painting."
      />
    </>
  );
}

export default About;
