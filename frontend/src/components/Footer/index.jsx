import { Layout, Typography } from "antd";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Built with 💙 and a ton of AI by{" "}
      <a href="https://github.com/harshitsinghai77" target="_blank">
        Harshit Singhai
      </a>
      &nbsp;
      <a
        color="inherit"
        href="https://www.hackerearth.com/challenges/hackathon/jetbrains-pychamps/"
        target="_blank"
      >
        @JetBrains PyChamps
      </a>
      &nbsp;{new Date().getFullYear()}
    </Typography>
  );
}

function Footer() {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>{Copyright()}</Layout.Footer>
  );
}

export default Footer;
