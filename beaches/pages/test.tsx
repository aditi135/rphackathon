import { useState, useEffect } from "react";
import styles from "../styles/main.module.css";
import Head from "next/head";
import Beaches from "../components/Beaches.js"
import BeachTab from "../components/BeachTab.js"
import {useState, useEffect} from "react"

import coords from "./data-storage/coordinates-beach.json";

interface Beach {
  id: string;
  name: string;
  statistics: {
    waterTemperature: number;
    waveHeight: number;
    crowdedness: number;
  };
  url: string; // Ensure 'url' property exists
}
import coords from "./data-storage/coordinates-beach.json"

export default function Map() {
  const [beaches, setBeaches] = useState<Beach[]>([]); // Specify Beach[] as the type
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBeachUrl, setSelectedBeachUrl] = useState<string | null>(null); // Specify string | null for selectedBeachUrl

  useEffect(() => {
    async function fetchBeaches() {
      try {
        const response = await fetch('/beaches.json');
        const data = await response.json();
        setBeaches(data);
      } catch (error) {
        console.error('Error fetching beach data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBeaches();
  }, []);

  const handleBeachTabClick = (url: string) => { // Ensure 'url' parameter is correctly typed as string
    setSelectedBeachUrl(url);
  };

  return (
    <>
      <Head>
        <title>Beach Advisory</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main className={styles.container}>
          <h1>Beach Advisory</h1>

        <div className={styles.columns}>
          <div className={styles.left}>
            <h1>Left</h1>
            <div className={styles.googlemap}>
              <iframe
                src={selectedBeachUrl || coords["12th Street"]}
                width={600}
                height={450}
                style={{ border: '0' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className={styles.right}>
            <h2>Results - Right</h2>
            {beaches.map((beach) => (
              <BeachTab
                key={beach.id}
                beach={beach}
                onClick={() => handleBeachTabClick(beach.url)}
              />
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
