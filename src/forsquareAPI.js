const request = require('request-promise')

const client_id = 'ZE4XMIMWDLPU3X52MEHDSVR1FGASQVLARJ31RRWNNABRVJ0W'
const client_secret = 'WTYY3A3HOMTKCMPJXRB1EJKY3THLTIAFWZFNL2YRQRSAFA1C'

export const fetchRecommendedLocations = (lat, lng, onSuccess, onError) => {
  request({
    url: 'https://api.foursquare.com/v2/venues/explore',
    method: 'GET',
    qs: {
      client_id: client_id,
      client_secret: client_secret,
      ll: lat + ',' + lng,
      v: '20180323',
      limit: 3
    },
    timeout: 5
  }).then(function (htmlString) {
    console.log("dupa")
    const body = JSON.parse(htmlString)
    onSuccess(body.response.groups[0].items)
    return body.response.groups[0].items
  })
  .catch(function (err) {
    return onError()
  })
}