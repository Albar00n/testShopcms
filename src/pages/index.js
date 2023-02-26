/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'

import Layout from '@components/Layout'
import Container from '@components/Container'
import Button from '@components/Button'

import products from '@data/products'

import styles from '@styles/Page.module.scss'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client'
import Image from 'next/image'
export default function Home({ home, products }) {
  // console.log('products', products)
  const { heroTitle, heroText, heroLink, heroBackground } = home

  return (
    <Layout>
      <Head>
        <title>Space Jelly Gear</title>
        <meta name="description" content="Get your Space Jelly gear!" />
      </Head>

      <Container>
        <h1 className="sr-only">Space Jelly Gear</h1>

        <div className={styles.hero}>
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img
                className={styles.heroImage}
                src={heroBackground.url}
                alt={heroTitle}
                width={heroBackground.width}
                height={heroBackground.height}
              />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.map((product) => {
            return (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img
                        width={product.image.width}
                        height={product.image.height}
                        src={product.image.url}
                        alt=""
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productPrice}>${product.price}</p>
                  </a>
                </Link>
                <p>
                  <Button
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-url={`/products/${product.slug}`}
                    data-item-price={product.price}
                    data-item-image={product.image.url}
                    data-item-name={product.name}
                  >
                    Add to cart
                  </Button>
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
   const client = new ApolloClient({
    uri:
      'https://api-eu-west-2.hygraph.com/v2/clek1rew10v9p01tah37ofw8u/master',
    cache: new InMemoryCache(),
  })
  const data = await client.query({
    query: gql`
      query PageHome {
        page(where: { slug: "home" }) {
          id
          heroLink
          heroText
          heroTitle
          name
          slug
          heroBackground {
            width
            url
            height
          }
          # localizations(locales: [$locale]) {
          #   heroText
          #   heroTitle
          #   locale
          # }
        }

        products(first: 4) {
          id
          name
          price
          slug
          image {
            height
            width
            url
          }
        }
      }
    `,
  })

  const home = data.data.page
  // if (home.localizations.length > 0) {
  //   home = {
  //     ...home,
  //     ...home.localizations[0],
  //   }
  // }
  const products = data.data.products
  return {
    props: { home, products },
  }
}
