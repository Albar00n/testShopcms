/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import Layout from '@components/Layout'
import Header from '@components/Header'
import Container from '@components/Container'
import Button from '@components/Button'
import styles from '@styles/Product.module.scss'

export default function Product({ product }) {
  console.log('product', product)
  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
        <meta
          name="description"
          content={`Find ${product.name} at Space Shop`}
        />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <img
              src={product.image.url}
              alt={product.name}
              width={product.image.width}
              height={product.image.height}
            />
          </div>
          <div className={styles.productContent}>
            <h1>{product.name}</h1>
            <div
              className={styles.productDescription}
              dangerouslySetInnerHTML={{
                __html: product.description?.html,
              }}
            />

            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productBuy}>
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
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri:
      'https://api-eu-west-2.hygraph.com/v2/clek1rew10v9p01tah37ofw8u/master',
    cache: new InMemoryCache(),
  })
  // console.log('params.productSlug', params.productSlug)

  const data = await client.query({
    query: gql`
      query PageProduct($slug: String) {
        product(where: { slug: $slug }) {
          id
          name
          slug
          price
          image {
            url
            width
            height
          }
          description {
            html
          }
        }
      }
    `,
    variables: {
      slug: params.productSlug,
    },
  })
  console.log('data', data)

  const product = data.data.product

  return {
    props: {
      product,
    },
  }
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri:
      'https://api-eu-west-2.hygraph.com/v2/clek1rew10v9p01tah37ofw8u/master',
    cache: new InMemoryCache(),
  })
  const data = await client.query({
    query: gql`
      query PageProducts {
        products {
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

  const paths = data.data.products.map((product) => {
    return {
      params: {
        productSlug: product.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
