'use strict'
var test = require('tape')
var comiczin = require('../index')
var fs = require('fs')
var path = require('path')
var iconv = require('iconv-lite')
var missi = require('mississippi')

test('var client = new Comiczin', t => {
  var c = comiczin()
  t.is(c.name, 'shop.comiczin.jp', 'c.name eq "shop.comiczin.jp"')
  t.is(c.failAfter, 7, 'c.failAfter === 7')
  t.is(c.searchHome, 'https://shop.comiczin.jp/products/list.php', 'c.searchHome eq "https://shop.comiczin.jp/products/list.php"')
  t.end()
})

test('var queryStr = client.createQuery(params)', t => {
  var c = comiczin()
  var params = {
    category: 'act',
    value: '井上眞改'
  }

  t.test('var queryObj = client.transformQuery(params)', tt => {
    var o = c.transformQuery(params)
    tt.deepEqual(o, {
      mode: 'search',
      name: '井上眞改'
    }, `{
      mode: 'search',
      name: '井上眞改'
    }`)
    tt.end()
  })
  var qs = c.createQuery(params)
  t.ok(/name=%E4%BA%95%E4%B8%8A%E7%9C%9E%E6%94%B9/.test(qs), qs)
  t.end()
})

test('var stream = c.createStream()', t => {
  var c = comiczin()
  var i = 0
var a = [
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=31120',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_31000/_m/31120_m.jpg',
    title: '酔どう!',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=29485',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_29000/_m/29485_m.jpg',
    title: '酒者天之美禄',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=27033',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_27000/_m/27033_m.jpg',
    title: '百代の過客',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=23477',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_23000/_m/23477_m.jpg',
    title: '吹雪の夜に',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=22340',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_22000/_m/22340_m.jpg',
    title: 'SUMIABE',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=21194',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_21000/_m/21194_m.jpg',
    title: 'SENBERO',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=18888',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_18000/_m/18888_m.jpg',
    title: 'KONAKARA',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=17287',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_17000/_m/17287_m.jpg',
    title: 'HASHIGOZAKE',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=16181',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_16000/_m/16181_m.jpg',
    title: 'Repentance is a bitter physic',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=15057',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_15000/_m/15057_m.jpg',
    title: 'HIYAOROSHI',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=10912',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_10000/_m/10912_m.jpg',
    title: 'WESTLAND WYVERN',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=9550',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_9000/_m/9550_m.jpg',
    title: 'SUMINOE',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=7369',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_7000/_m/7369_m.jpg',
    title: 'KAMISUWA',
    circle: '流星' },
    { urlOfTitle: 'https://shop.comiczin.jp/products/detail.php?product_id=5963',
    srcOfThumbnail: 'https://shop.comiczin.jp/upload/save_image/_5000/_m/5963_m.jpg',
    title: 'MARU',
    circle: '流星機関' }
  ]
  missi.pipe(
    fs.createReadStream(path.join(__dirname, 'shinkai.html')),
    iconv.decodeStream(c.charset),
    c.scraper(),
    missi.through.obj((o, _, d) => {
      t.deepEqual(a[i], o, JSON.stringify(o))
      i += 1
      d()
    }),
    err => {
      t.notOk(err, 'no exits error')
      t.is(i, 14, 'b.length eq 14')
      t.end()
    }
  )
})
