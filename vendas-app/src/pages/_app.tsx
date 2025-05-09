import type { AppProps } from "next/app";
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'bulma/css/bulma.css'
import'components/common/loader/loader.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
