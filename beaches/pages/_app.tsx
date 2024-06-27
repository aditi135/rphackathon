// import type { AppProps } from 'next/app'
 
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }


import type { AppProps } from 'next/app'
import '../styles/global.css';

 
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}