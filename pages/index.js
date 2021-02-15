import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UiFileInputButton from '../components/UiFileInputButton'
import { uploadFileRequest } from '../services/uploader';
import { useState } from 'react';

export default function Home() {
  const [isUploading, setIsUploading] = useState(false)
  const [downloadHref, setDownloadHref] = useState('')

  const onChange = async (formData) => {
    setIsUploading(true)
    setDownloadHref('')
    const response = await uploadFileRequest(formData, (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    });

    var encodedUri = `data:text/csv; charset=utf-8,${encodeURI(response)}`
    setDownloadHref(encodedUri)
    setIsUploading(false)
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cagece PDF to CSV Converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Cagece PDF to CSV converter
        </h1>
        <p/>
        <p/>
        { isUploading ? 'Wait' : <UiFileInputButton label="Upload Single File" uploadFileName="theFiles" onChange={onChange} /> }
        <p/>
        <p/>
        { downloadHref ? <a href={downloadHref} download={'data.csv'}>Download</a>: ''}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/AlysonBasilio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Alyson Basilio
        </a>
      </footer>
    </div>
  )
}
