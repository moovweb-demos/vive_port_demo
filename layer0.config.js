module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'www.viveport.com',
      hostHeader: 'www.viveport.com',
    },
  },
}
