module.exports = {
  presets: ["next/babel"],
  plugins: [
    "graphql-tag",
    "lodash",
    [
      "styled-components",
      {
        displayName: process.env.NODE_ENV !== "production",
        pure: true,
        ssr: true
      }
    ]
  ]
};
