import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/index";
import Router from "next/router";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    // provide redux store to entire application
    <Provider store={store}>
      <Layout>
        {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Component {...pageProps} />
      )}
      </Layout>
    </Provider>
  );
}

export default MyApp;
