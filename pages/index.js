import Head from 'next/head'
import { motion } from 'framer-motion';
import Footer from '@components/Footer'
import Scoreboard from '../components/Scoreboard'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>best-of-3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <motion.h1
				className="text-4xl font-extrabold text-black-300 drop-shadow-lg"
        >Best of 3</motion.h1>
        <Scoreboard />
      </main>

      <Footer />
    </div>
  )
}
