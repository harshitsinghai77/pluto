import { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CarouselShowcase from "../../components/Carousel";
import axios from "axios";

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
  carousel: {
    height: "500px",
    width: "70vw",
    img: {
      maxheight: "300px",
      maxWidth: "500px",
    },
  },
}));
function Showcase() {
  const classes = useStyles();

  const [showcase, setShowcase] = useState([]);

  useEffect(() => {
    axios
      .get("https://go-deployment.herokuapp.com/img_url")
      .then((res) => {
        const { data } = res;
        setShowcase(res.data.data);
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
      <CarouselShowcase imgGallary={showcase} />
      <Container>
        <Grid container className={classes.container}>
          <Grid item md={6}>
            <Typography variant={"h3"} className={classes.mainTitle}>
              Avalaible artists
            </Typography>
            <Typography variant={"body1"} className={classes.mainTitle}>
              We are working to include representation from Asia, Africa, and
              Latinamerican artists.
            </Typography>
          </Grid>
        </Grid>

        <Container alignItems="center" justifyContent="center">
          <Grid container className={classes.container}>
            <Grid item>
              <Typography variant={"body1"} className={classes.mainTitle}>
                For this collection we included Claude Monet, Vicent Van Gogh,
                Leonid Afremov and Edvard Munch.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Hero
        title="Showcase"
        subtitle="With help of AI convert your favorite shot into a famous artist’s painting."
      />
    </>
  );
}

export default Showcase;
