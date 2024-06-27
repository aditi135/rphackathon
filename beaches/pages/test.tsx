"use client";

import styles from "../styles/main.module.css";
import Head from "next/head";
import Beaches from "../components/Beaches.js"
import BeachTab from "../components/BeachTab.js"
import {useState, useEffect} from "react"

import coords from "./data-storage/coordinates-beach.json"

export default function Map() {

  const [beaches, setBeaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBeaches() {
      try {
        const response = await fetch('/beaches.json');
        
        const data = await response.json();
        console.log(data);
        setBeaches(data);
      } catch (error) {
        console.error('Error fetching beach data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBeaches();
  }, []);
    return (
      <div className={styles.total}>
        <Head>
          <title>Beach Advisory</title>
        </Head>

        <main className={styles.container}>
          <h1 className={styles.title}>Beach Advisory</h1>

          <div className={styles.columns}>
            <div className={styles.left}>
              <h1>Left</h1>
              <div className={styles.googlemap}>
                <iframe
                  src={coords["12th Street"]}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className={styles.right}>
              <h2>Results - Right</h2>
              {beaches.map((beach) => (
                <BeachTab beach={beach} key={beach.id}/>
              ))}
            </div>
          </div>
        </main>

      </div>


    )
  }
