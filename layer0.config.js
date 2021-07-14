module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'viveport.com',
      hostHeader: 'viveport.com',
    },
  },
}
