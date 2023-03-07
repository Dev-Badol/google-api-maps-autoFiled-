import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.google}&libraries=places&callback=initMap`}
          ></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              function initMap() {
            
              }
            `
          }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
