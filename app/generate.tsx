'use client'
import styles from './page.module.css'
import { useState } from 'react';

const Generate = () => {
  const [address, setAddress] = useState('');
  const [beggarUrl, setBeggarUrl] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const generateUrl = () => {
    setCopiedUrl(false);
    setBeggarUrl('https://basebeg.com/api/' + address);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(beggarUrl);
    setCopiedUrl(true);
  }

  return (
    <main className={styles.main}>
      <div className={styles.generateContainer}>
        <h2 className={styles.header}>Paste your wallet address and generate!</h2>
        <div className={styles.genUrlContainer}>
          <input className={styles.input} placeholder='Your wallet address' value={address} onChange={(ev) => {
            setAddress(ev.target.value);
          }}/>
          <button className={styles.button} onClick={generateUrl}>Generate Frame URL</button>
        </div>
        <>
          {beggarUrl && (
            <div className={styles.copyUrlContainer}>
              <a className={styles.url} href={beggarUrl}>{beggarUrl}</a>
              <button onClick={copyToClipboard} className={styles.buttonCopy}>{copiedUrl ? 'Copied!' : 'Copy Frame URL'} </button>
            </div>
          )}
        </>
      </div>
    </main>
  )
}

export default Generate;
