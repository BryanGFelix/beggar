import { getFrameMetadata } from 'frog/next';
import type { Metadata } from 'next';

import styles from './page.module.css'
import Generate from './generate';

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`,
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
