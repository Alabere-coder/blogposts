import Layout from '@/component/Layout'
import '@/styles/globals.css'
import "@arco-design/web-react/dist/css/arco.css";
import { ConfigProvider } from "@arco-design/web-react";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider >
      <Layout>
        <Component {...pageProps} />
    </Layout>
    </ConfigProvider>
  );
}
