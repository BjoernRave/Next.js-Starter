const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  env: {
    BACKEND_URL:
      process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000',
  },
})
