import { defaultTheme } from "react-admin";

const theme = {
  ...defaultTheme,
  // palette: {
  //   mode: 'dark',
  // },
  components: {
    ...defaultTheme.components,
    MuiCard: {
      defaultProps: {
        style: {
          borderRadius: 10
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        variant: 'outlined',
        style: {
          borderRadius: 10,
          margin: 5,
        },
        "&:hover": {
          scale: 1.1,
        },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          "& .RaDatagrid-headerCell": {
            backgroundColor: "rgb(232, 244, 248)", //change colors later
          },
        },
      },
    },
  },
};

export default theme;
