import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"
        ></script>
        <div
          hidden
          id="snipcart"
          data-api-key="NjYxOWI1ZWQtMzYxOC00Y2EyLWE3ODQtZmE0YzY4YjJmZmQyNjM4MTI5OTg0MTUyMzQ2NzE4"
          data-config-model-style="side"
        ></div>
      </body>
    </Html>
  )
}
