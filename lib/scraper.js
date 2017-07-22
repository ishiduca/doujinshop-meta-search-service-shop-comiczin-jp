var missi = require('mississippi')
var trumpet = require('trumpet')

var SHOP_COMICZIN_JP = 'https://shop.comiczin.jp'

module.exports = function scraper () {
  var ws = trumpet()
  var rs = missi.through.obj()
  var selector = '.list_item .data_area'
  var c = 0
  var isEnded = false

  ws.selectAll(selector, function (aNode) {
    var tr = trumpet()
    var o = {}
    c += 1
    tr.select('a', function (a) {
      a.getAttribute('href', function (href) {
        o.urlOfTitle = SHOP_COMICZIN_JP + href
        tr.select('a>img', function (img) {
          img.getAttribute('src', function (src) {
            src = src.replace(/_s(\.\w+)$/, rep)
            function rep (_, ext) { return '_m' + ext }
            o.srcOfThumbnail = SHOP_COMICZIN_JP + src
            img.getAttribute('alt', function (alt) {
              o.title = alt
              tr.select('.item_comment_area', function (p) {
//                var tr = trumpet()
                var b = []
                missi.pipe(
                  p.createReadStream(),
//                  trumpet(),
                  missi.through.obj(function (r, _, done) {
                    b.push(r); done()
                  }, function (done) {
                    var str = Buffer.isBuffer(b[0])
                      ? String(Buffer.concat(b))
                      : b.join('')
                    o.circle = str.split(/<br\s*?\/?>/)[0].trim()
                    done()
                  }),
                  function (err) {
                    if (err) rs.emit('error', err)
                    rs.write(o)
                    c -= 1
                    if (c === 0 && isEnded) rs.end()
                  }
                )
              })
            })
          })
        })
      })
    })
    aNode.createReadStream().pipe(tr)
  })

  ws.once('end', function () {
    if (c === 0) rs.end()
    else (isEnded = true)
  })

  return missi.duplex.obj(ws, rs)
}
