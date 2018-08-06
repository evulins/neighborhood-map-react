const request = require('request-promise')

const client_id = 'ZE4XMIMWDLPU3X52MEHDSVR1FGASQVLARJ31RRWNNABRVJ0W'
const client_secret = 'WTYY3A3HOMTKCMPJXRB1EJKY3THLTIAFWZFNL2YRQRSAFA1C'

export const fetchRecommendedLocations = (lat, lng, callback) => {
  request({
    url: 'https://api.foursquare.com/v2/venues/explore',
    method: 'GET',
    qs: {
      client_id: client_id,
      client_secret: client_secret,
      ll: lat + ',' + lng,
      v: '20180323',
      limit: 3
    }
  }).then(function (htmlString) {
    const body = JSON.parse(htmlString)
    callback(body.response.groups[0].items)
    return body.response.groups[0].items
  })
  .catch(function (err) {
    console.error(err);
  })
}