/*
 Importing amp-sw
 https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp_to_pwa/
 https://github.com/ampproject/amp-sw
*/

importScripts("https://cdn.ampproject.org/sw/amp-sw.js");

AMP_SW.init({
  // Caching Assets
  // https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching
  assetCachingOptions: [
    {
      regexp: /\.(png|jpg|woff2|woff|css|js)/,
      cachingStrategy: "CACHE_FIRST"
    }
  ],
  // Offline page for VD.cz
  // https://github.com/ampproject/amp-sw/tree/master/src/modules/offline-page
  offlinePageOptions: {
    url: "/offline.html",
    assets: []
  },
  // Link prefetch
  // https://github.com/ampproject/amp-sw/tree/master/src/modules/link-prefetch
  linkPrefetchOptions: {}
});
