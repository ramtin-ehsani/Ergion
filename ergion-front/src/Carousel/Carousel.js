import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import ReactPlayer from "react-player";
import { withStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

const styles = (theme) => ({});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif',
  },
  direction: "rtl",
});

class CarouselMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.filteredFile(this.props.files),
    };
  }



  fileTypeExtractor = (src) => {
    const lastIndexOfDot = String(src).lastIndexOf(".");
    const type = String(src).substring(lastIndexOfDot);
    return type;
  };

  TypeOfFile = (props) => {
    const { src } = props;

    const lastIndexOfSlash = String(src).lastIndexOf("/");
    const lastIndexOfDot = String(src).lastIndexOf(".");
    let name = String(src).substring(lastIndexOfSlash + 1);
    const type = String(src).substring(lastIndexOfDot);

    if (name.length > 15) {
      name = name.substring(0, 15) + type;
    }

    if (type === ".mp4") {
      return (
        <div style={{ padding: "12px" }}>
          <ReactPlayer
            width="100%"
            height={400}
            url={src}
            controls
            style={{ backgroundColor: "black" }}
          />

          <Typography>
            <Box
              fontSize={16}
              dir="ltr"
              fontWeight="fontWeightBold"
              textAlign="center"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {name}
            </Box>
          </Typography>
        </div>
      );
    } else if (type === ".jpg" || type === ".jpeg" || type === ".png") {
      return (
        <div style={{ padding: "12px" }}>
          <CardMedia component="img" height={400} image={src} />

          <Typography>
            <Box
              fontSize={16}
              dir="ltr"
              fontWeight="fontWeightBold"
              textAlign="center"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {name}
            </Box>
          </Typography>
        </div>
      );
    }

    return null;
  };

  filteredFile = (files) => {
    const l = [];
    files.map((file) => {
      if (this.isPhotoOrVideo(this.fileTypeExtractor(file.file))) {
        l.push(file);
      }
    });
    return l;
  };

  isPhotoOrVideo = (type) => {
    if (
      type === ".jpg" ||
      type === ".jpeg" ||
      type === ".png" ||
      type === ".mp4"
    ) {
      return true;
    }
    return false;
  };

  render() {
    // const { classes } = this.props;
    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <div style={{ paddingRight: "15px", paddingLeft: "15px" }}>
            <Carousel
              autoPlay={false}
              timeout={400}
              animation="slide"
              changeOnFirstRender={false}
              fullHeightHover={false}
              indicators={this.state.list.length > 1}
              navButtonsAlwaysInvisible={this.state.list.length < 2}
              direction="rtl"
            >
              {this.state.list.map((file) => (
                <this.TypeOfFile src={file.file} key={file.id} />
              ))}
            </Carousel>
          </div>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

export default withStyles(styles)(CarouselMedia);
