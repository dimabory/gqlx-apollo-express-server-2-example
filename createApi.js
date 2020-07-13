const { URL } = require('url');
const fetch = require('node-fetch');
const path = require('path');
const concat = require('concat-stream');

function parseUrl(host, path) {
  try {
    const url = new URL(path, host);
    return url.href;
  } catch (e) {
    console.error(e);
    return host + path;
  }
}

function createOptions(
  host,
  pathOrOptions,
  body,
) {
  if (typeof pathOrOptions === 'string') {
    return {
      url: parseUrl(host, pathOrOptions),
      formData: undefined,
      body,
      headers: {},
      query: {},
    };
  }

  return {
    ...pathOrOptions,
    body: pathOrOptions.body,
    formData: pathOrOptions.formData,
    headers: pathOrOptions.headers || {},
    query: pathOrOptions.query || {},
    url: parseUrl(host, pathOrOptions.url),
  };
}

function getFormData(upload, data, req) {
  const formData = {};

  Object.keys(data || {}).forEach(key => {
    const value = data[key];

    if (value !== undefined) {
      formData[key] = value;
    }
  });

  return new Promise(resolve => {
    if (upload) {
      upload.then((file) => {
        file.createReadStream().pipe(
          concat((value) => {
              console.log(value, file.filename);
              resolve({
                file: {
                  value,
                  options: {
                    filename: file.filename,
                  },
                },
                ...formData,
              });
            },
          ),
        );
      });
    } else {
      resolve(formData);
    }
  });
}

module.exports = function createApi(service, req) {
  return {
    form(file, data) {
      return getFormData(file, data, req);
    },
    get(url) {
      const options = createOptions(service.data.url, url);
      return fetch(options.url, {
        method: 'GET',
        json: true,
        headers: options.headers,
        body: options.body,
        formData: options.formData,
      }).then(toJson);
    },
    post(url) {
      const options = createOptions(service.data.url, url);
      return fetch(options.url, {
        method: 'POST',
        json: true,
        headers: options.headers,
        body: options.body || options.formData,
        formData: options.formData,
      }).then(toJson);
    },
  };
};

function toJson(res) {
  return res.json();
}
