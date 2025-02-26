import type { NextPage } from 'next';
import Head from 'next/head';
import BSODRebootEffect from '../components/BSODRebootEffect';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BSOD Reboot Effect</title>
        <meta name="description" content="Animated BSOD reboot effect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BSODRebootEffect />
      </main>
    </div>
  );
};

export default Home;
