import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UiFileInputButton from '../components/UiFileInputButton'
import { uploadFileRequest } from '../services/uploader';

export default function Home() {
  const onChange = async (formData) => {
    const response = await uploadFileRequest(formData, (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    });

    console.log('response', response);
    var encodedUri = encodeURI(`data:text/csv;charset=utf-8,${response}`);
    window.open(encodedUri);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Cagece PDF to CSV converter
        </h1>

        <UiFileInputButton label="Upload Single File" uploadFileName="theFiles" onChange={onChange} />
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
