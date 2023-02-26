/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import Layout from '@components/Layout'
import Header from '@components/Header'
import Container from '@components/Container'
import Button from '@components/Button'

import styles from '@styles/Page.module.scss'
import Link from 'next/link'

export default function Category({ category, products }) {
  console.log('products', products)
  return (
    <Layout>
      <Head>
        <title>{category.name}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h1>{category.name}</h1>

        <h2>Products</h2>

        <ul className={styles.products}>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img
                        src={product.image.url}
                        alt={product.name}
                        width={product.image.width}
                        height={product.image.height}
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productPrice}>
                      ${product.price.toFixed(2)}
                    </p>
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

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri:
      'https://api-eu-west-2.hygraph.com/v2/clek1rew10v9p01tah37ofw8u/master',
    cache: new InMemoryCache(),
  })
  // console.log('params.productSlug', params.productSlug)

  const data = await client.query({
    query: gql`
      query PageCategory($slug: String) {
        category(where: { slug: $slug }) {
          id
          name
          slug
          products {
            id
            name
            price
            slug
            image {
              height
              url
              width
            }
          }
        }
      }
    `,
    variables: {
      slug: params.categorySlug,
    },
  })
  console.log('data', data)

  const category = data.data.category

  return {
    props: {
      category,
      products: category.products,
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
      query PageCategories {
        categories {
          id
          slug
        }
      }
    `,
  })

  const paths = data.data.categories.map((category) => {
    return {
      params: {
        categorySlug: category.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
