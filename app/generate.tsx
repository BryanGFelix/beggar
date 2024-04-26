'use client'
import styles from './page.module.css'
import { useState } from 'react';

const Generate = () => {
  const [address, setAddress] = useState('');
  const [beggarUrl, setBeggarUrl] = useState('');

  const generateUrl = () => {
    setBeggarUrl('https://basebeg.com/' + address);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(beggarUrl);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <input placeholder='Your wallet address' value={address} onChange={(ev) => {
          setAddress(ev.target.value);
        }}/>
        <button onClick={generateUrl}>Generate Frame URL</button>
        <p>{beggarUrl}</p>
        <button onClick={copyToClipboard}>Copy Frame URL</button>
      </div>
    </main>
  )
}

export default Generate;
