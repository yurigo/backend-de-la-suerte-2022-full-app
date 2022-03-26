// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'backend-de-la-suerte-parte-2',
        // URL to the GraphQL API
        url: 'https://txvmbrkukwgehmpfbvvc.nhost.run/v1/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }