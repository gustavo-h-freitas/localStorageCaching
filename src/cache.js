
module.exports = {
  get (url, config, queryParams) {
    if (!url) {
      throw new ReferenceError('you must pass a response object')
    }

    if ((Array.isArray(config) || typeof config !== 'object') && typeof config !== 'undefined') {
      throw new TypeError('config must be an object or unset')
    }

    if (Array.isArray(queryParams) && typeof queryParams !== 'undefined') {
      throw new TypeError('queryParams must be an object or unset')
    }

    if (Object.keys(queryParams)) {
      return localStorage.getItem(url + '-' + JSON.stringify({
        ...(Object.keys(queryParams).length ? { queryParams } : null),
      }))
    } else if (!config && typeof url === 'object') {
      return localStorage.getItem(url.url)
    }

    return cache.get(url)

  },

  set (res, queryParams, url) {
    if (!res) {
      throw new ReferenceError('you must pass a response object')
    }

    if (Array.isArray(queryParams) && typeof queryParams !== 'undefined') {
      throw new TypeError('queryParams must be an object or unset')
    }

    if (Object.keys(queryParams).length) {

      localStorage.setItem(url + '-' + JSON.stringify({
        ...(Object.keys(queryParams).length ? { queryParams } : null),
      }), JSON.stringify(res.data))

    } else {
      localStorage.setItem(url, JSON.stringify(res.data))
    }
  }
}