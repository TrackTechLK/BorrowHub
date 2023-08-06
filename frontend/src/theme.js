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
            backgroundColor: "#ddd", //change colors later
          },
        },
      },
    },
  },
};

export default theme;
