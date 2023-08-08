import { defaultTheme } from "react-admin";

const theme = {
  ...defaultTheme,
  // palette: {
  //   mode: 'dark',
  // },
  components: {
    ...defaultTheme.components,
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
