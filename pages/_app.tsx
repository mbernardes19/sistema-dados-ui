import { AppProps } from 'next/app'
import '../styles.css'
import Head from 'next/head';
import { UserContextProvider } from '../services/context/user-context-provider'
import { Router } from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading ${url}`);
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})


function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <>
    <Head>
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp