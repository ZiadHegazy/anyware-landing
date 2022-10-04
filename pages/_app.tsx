import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "@/theme";
import createEmotionCache from "@/helpers/createEmotionCache";
import { wrapper } from "@/store/store";
import { GlobalStyles } from "@mui/material";

import "@fontsource/manrope/300.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import MainModal from "@/components/UI/MainModal";
import { useSelector } from "react-redux";
import { selectModalOpen } from "@/store/appSlice";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const modalOpen = useSelector(selectModalOpen);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyles
          styles={{
            ".MuiAccordionSummary-root .MuiAccordionSummary-content": {
              margin: "12px 8px !important",
            },
            ".MuiAccordionSummary-root .MuiAccordionSummary-content.Mui-expanded":
              {
                margin: "12px 8px !important",
              },
            ".MuiAccordionSummary-root.Mui-expanded": {
              minHeight: "0 !important",
            },
            ".MuiAccordionSummary-root.Mui-expanded .MuiTypography-root": {
              marginLeft: "0 !important",
            },
          }}
        />
        <Component {...pageProps} />
        {modalOpen && <MainModal />}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
