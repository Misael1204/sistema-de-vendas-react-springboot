import Head from "next/head";
import { Layout } from 'components'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Vendas App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Bem vindo
      <Layout />
    </div>
  )
}

export default Home;
