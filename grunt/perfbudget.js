// TODO pridat testovani dalsich sablon (zatim neumi)
// viz https://github.com/tkadlec/grunt-perfbudget/issues/10

'use strict';

module.exports = {

  default: {
    options: {
      url: 'http://www.vzhurudolu.cz/ebook',
      key: 'A.393688d7205d1193096b3473d97245bc',
      location: 'ec2-eu-west-1:Chrome',
      connectivity: '3G',
      timeout: 600,
      budget: {
        SpeedIndex: '2000'
      }
    }
  }

}; // module.exports
