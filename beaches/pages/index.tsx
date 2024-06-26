import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const sceneStyles = {
    height: '100vh',
    width: '100vw',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };

  const skyStyles = {
    width: '100%',
    height: '50%',
    backgroundColor: '#bd4f6c',
    backgroundImage: 'radial-gradient(circle at right, #bd4f6c, #d7816a)',
    backgroundSize: '400% 400%',
    position: 'relative',
    WebkitBoxReflect: 'below 0 linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    animation: 'sky var(--time) ease infinite',
  };

  const ocean = {
    backgroundColor: '#add8e6', // Light blue color
    backgroundImage: 'radial-gradient(circle at center, #522343, #411c35)',
  };

  const textStyle = {
    fontSize: '3rem',
    fontWeight: 'bolder',
    zIndex: '300',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const sunStyles = {
    height: '15vw',
    width: '15vw',
    borderRadius: '50%',
    backgroundColor: '#a40606',
    backgroundImage: 'linear-gradient(315deg, #a40606 0%, #d98324 74%)',
    animation: 'set 5s ease infinite', // Ensure this matches the keyframes name and desired duration
    boxShadow: '0 0 210px 100px rgba(253, 143, 54, 0.6), 0 0 210px 200px rgba(251, 167, 98, 0.781)',
    position: 'absolute',
    top: '53%',
    left: '42.4%',
  };

  const starStyles = {
    width: '10px',
    height: '10px',
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
  };

  const lineStyles = {
    width: '0.3em',
    height: '0.3em',
    backgroundColor: 'white',
    zIndex: '-1',
    borderRadius: '50%',
    animation: 'stars var(--time) infinite',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          {`
            @keyframes set {
              0%, 100% {
                transform: translateY(0%);
              }
              50% {
                transform: translateY(-20%);
              }
            }

            @keyframes sky {
              0% {
                background-position: 0% 0%;
              }
              100% {
                background-position: 100% 400%;
              }
            }

            @keyframes stars {
              from {
                transform: scale(1);
              }
              to {
                transform: scale(1.5);
              }
            }
          `}
        </style>
      </Head>

      <div style={sceneStyles}>
        <div style={skyStyles}>
          <div style={textStyle}>Beaches</div>
          {/* Add your stars here */}
          {Array.from({ length: 30 }).map((_, index) => (
            <div key={index} style={{ ...starStyles, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}></div>
          ))}
          {/* Display the sun */}
          <div style={sunStyles}></div>
        </div>
        <div style={{ ...ocean, height: '50%' }}>
          <Link href="/test" passHref>
            <div style={buttonStyle}>Go</div>
          </Link>
        </div>
      </div>
    </>
  );
}
