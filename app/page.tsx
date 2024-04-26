import { getFrameMetadata } from 'frog/next';
import type { Metadata } from 'next';

import styles from './page.module.css'
import Generate from './generate';
//test

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `https://beggar-qp4f.vercel.app/api`,
  )
  return {
    other: frameTags,
  }
}

const Home = () => {
  return (
    <main className={styles.main}>
      <Generate/>
    </main>
  )
}

export default Home;
