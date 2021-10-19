import React from "react";
import QRcode from "qrcode";
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import QrReader from "react-qr-reader";

const useStyles = makeStyles({
  root: {
    widht: "100%",
    height: "100vh",
  },
  card: {
    margin: "1rem",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "blue",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
});

const App: React.FC = () => {
  const [src, setsrc] = React.useState("");
  const [qrImage, setqrImage] = React.useState("");
  const [scanWeb, setScanWeb] = React.useState("");
  const [toggle, setToggle] = React.useState(false);
  const classes = useStyles();

  const generateQrCode = () => {
    QRcode.toDataURL(src).then((val) => setqrImage(val));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsrc(e.target.value);
  };

  const handleError = (e: Error) => {
    console.log(e);
  };

  const handleScanWebCam = (res: string | null) => {
    res && setScanWeb(res);
  };

  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
        <h2 className={classes.title}>Generate Qr Code</h2>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text Here"
                value={src}
                onChange={handleChange}
              />
              <br />
              <Button
                className={classes.btn}
                variant="contained"
                onClick={generateQrCode}
              >
                Generate
              </Button>
              <br />
              {qrImage && <img src={qrImage} alt="qrCode" />}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                onClick={() => setToggle((state) => !state)}
              >
                Scan by webcam
              </Button>
              {toggle && (
                <QrReader
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleError}
                  onScan={handleScanWebCam}
                />
              )}
              <h3>Scanned by webcam Code: {scanWeb}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
