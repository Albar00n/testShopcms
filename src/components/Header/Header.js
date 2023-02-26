import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { useSnipcart } from 'use-snipcart'
import Container from '@components/Container'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'

const Header = () => {
  const { cart = {} } = useSnipcart()
  // const { locale: activeLocale, locales ,asPath} = useRouter()

  // const availableLocales = locales.filter((local) => local !== activeLocale)

  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Shop</a>
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/stores">
              <a>Find A Store</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a></a>
            </Link>
          </li>
        </ul>
        <p className={styles.headerCart}>
          <button className="snipcart-checkout">
            <FaShoppingCart />
            <span>${cart.subtotal?.toFixed(2)}</span>
          </button>
        </p>
        {/* <ul className={styles.headerLocales}>
          {availableLocales.map((locale) => {
            return (
              <li key={locale}>
                <Link href={asPath} locale={locale}>
                  <a>{locale.toUpperCase()}</a>
                </Link>
              </li>
            )
          })}
        </ul> */}
      </Container>
    </header>
  )
}

export default Header
