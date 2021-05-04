
module.exports = {
  get (url, body, config, queryParams, bodyParams) {
    if (!url) {
      throw new ReferenceError('you must pass a response object')
    }

    if ((Array.isArray(body) || typeof body !== 'object') && typeof body !== 'undefined') {
      throw new TypeError('body must be an object or unset')
    }

    if ((Array.isArray(config) || typeof config !== 'object') && typeof config !== 'undefined') {
      throw new TypeError('config must be an object or unset')
    }

    if (Array.isArray(queryParams) && typeof queryParams !== 'undefined') {
      throw new TypeError('queryParams must be an object or unset')
    }

    if (!Array.isArray(bodyParams) && typeof bodyParams !== 'undefined') {
      throw new TypeError('bodyParams must be an array or unset')
    }

    // if (url[0] !== '/') {
    //   url = '/' + url
    // }

    if (Object.keys(queryParams) || Array.isArray(bodyParams)) {
      const bodyObject = {}

      if (Array.isArray(bodyParams) && body) {
        bodyParams.forEach(elem => {
          bodyObject[elem] = body[elem]
        })
      }

      return localStorage.getItem(url + '-' + JSON.stringify({
        ...(Object.keys(queryParams).length ? { queryParams } : null),
        ...(Object.keys(bodyObject).length ? { bodyObject } : null)
      }))
    } else if (!config && typeof url === 'object') {
      return localStorage.getItem(url.url)
    }

    return cache.get(url)

  },

  set (res, queryParams, bodyParams, url) {
    if (!res) {
      throw new ReferenceError('you must pass a response object')
    }

    if (Array.isArray(queryParams) && typeof queryParams !== 'undefined') {
      throw new TypeError('queryParams must be an object or unset')
    }

    if (!Array.isArray(bodyParams) && typeof bodyParams !== 'undefined') {
      throw new TypeError('bodyParams must be an array or unset')
    }

    if (Object.keys(queryParams).length || Array.isArray(bodyParams)) {
      const bodyObject = {}
      const req = res.data

      if (Array.isArray(bodyParams)) {
        bodyParams.forEach(elem => {
          bodyObject[elem] = req[elem]
        })
      }

      localStorage.setItem(url + '-' + JSON.stringify({
        ...(Object.keys(queryParams).length ? { queryParams } : null),
        ...(Object.keys(bodyObject).length ? { bodyObject } : null)
      }), JSON.stringify(res.data))

    } else {
      localStorage.setItem(url, JSON.stringify(res.data))
    }
  }
}