import PropTypes from 'prop-types'

import '_styles/base.css'

const App = ({ Component, pageProps }) => <Component {...pageProps} />

App.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.instanceOf(Object),
}

export default App
