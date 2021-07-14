import cheerio from 'cheerio'
import Response from '@layer0/core/router/Response'
import Request from '@layer0/core/router/Request'

import { Router } from '@layer0/core/router'
import { starterRoutes } from '@layer0/starter'
import { CACHE_ASSETS, CACHE_PAGES } from './cache'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .use(starterRoutes)

  .match('/', shoppingFlowRouteHandler)

  // PLP page
  .match('/app.html', shoppingFlowRouteHandler)

  // PDP page

  // .match('/:path*', shoppingFlowRouteHandler)

  // CSS file
  // .match('/sites/coopervision.com/files/css/:path*', ({ cache, proxy }) => {
  //   proxy('origin', {
  //     transformResponse: (response: Response, request: Request) => {
  //       if (response.body) {
  //         const $ = cheerio.load(response.body)
  //         response.body = $.html()
  //                           .replace(/https:\/\/coopervision.com\//g, '/')
  //       }
  //     }
  //   })
  // })

  // example route for cacheable assets:
  // .match('/admin/uploads/:path*', ({ cache, proxy }) => {
  //   cache(CACHE_ASSETS)
  //   return proxy('origin')
  // })

  .match('/service-worker.js', ({ serviceWorker }) => serviceWorker('dist/service-worker.js'))
  // .match('/service-worker.js', ({ serviceWorker }) => serviceWorker('./service-worker.js'))
  .match('/main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    return serveStatic('dist/browser.js')
    // return serveStatic('dist/browser.js')
  })

  // fallback route for all other requests:
  .fallback(({ proxy }) => {
    proxy('origin')
  })

//////////////////////////////////////////////////////////
////////// Static Prerendering implementation ////////////
//////////////////////////////////////////////////////////

// More details at:
// https://developer.moovweb.com/guides/static_prerendering

// .prerender([
//   // HTML pages
//   { path: '/' },
//   { path: '/categories/mens' },
//   { path: '/categories/mens/shirts' },
//   { path: '/categories/mens/pants' },
//   { path: '/categories/womens' },
//   { path: '/categories/womens/shirts' },
//   { path: '/categories/womens/pants' },

//   // API responses
//   { path: '/api/index.json' },
//   { path: '/api/categories/mens.json' },
//   { path: '/api/categories/mens/shirts.json' },
//   { path: '/api/categories/mens/pants.json' },
//   { path: '/api/categories/womens.json' },
//   { path: '/api/categories/womens/shirts.json' },
//   { path: '/api/categories/womens/pants.json' },
// ])
