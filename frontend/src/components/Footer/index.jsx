import { Layout, Typography } from "antd";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Built with 💙 and a ton of AI by&nbsp;
      <a href="https://github.com/harshitsinghai77" target="_blank">
        Harshit Singhai
      </a>
      &nbsp;©{new Date().getFullYear()}
      {/* <a
        color="inherit"
        href="https://github.com/harshitsinghai77"
        target="_blank"
      >
        Github
      </a> */}
    </Typography>
  );
}

function Footer() {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>{Copyright()}</Layout.Footer>
  );
}

export default Footer;
