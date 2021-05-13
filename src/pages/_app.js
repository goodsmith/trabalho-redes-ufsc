import { ToastProvider } from 'react-toast-notifications'

import Provider from '../state'
import styles from '../styles.module.css'

import '../normalize.css'

const App = ({ Component, pageProps }) => (
  <main className={styles.container}>
    <ToastProvider placement="top-center">
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ToastProvider>
  </main>
)

export default App
