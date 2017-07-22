var xtend = require('xtend')
var inherits = require('inherits')
var Service = require('doujinshop-meta-search-service')

module.exports = Comiczin
inherits(Comiczin, Service)

function Comiczin () {
  if (!(this instanceof Comiczin)) return new Comiczin()
  Service.call(this, 'shop.comiczin.jp', {
    charset: 'utf8',
    searchHome: 'https://shop.comiczin.jp/products/list.php'
  })
}

Comiczin.prototype.transformQuery = function (_p) {
  var p = xtend(_p)
  var a = xtend({
    mode: 'search',
    name: p.value
  })
  delete p.value
  delete p.category
  return xtend(a, p)
}

Comiczin.prototype.scraper = require('./lib/scraper')
