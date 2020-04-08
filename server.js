const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

const fileCache = {};

const mimes = {
  htm: 'text/html',
  html: 'text/html',
  js: 'application/javascript',
  css: 'text/css',
};

const mimeTypeFromPath = filePath => {
  const matches = filePath.match(/(?<=\.)[^.]{1,32}$/);
  if (matches === null) {
    return null;
  }

  const extension = matches[0];
  const mime = mimes[extension];

  if (mime) {
    return mime;
  }

  return null;
};

const pathFromURL = urlString => {
  const urlPath = url.parse(urlString).pathname;
  const lastIndex = urlPath.length - 1;
  const lastCharacter = urlPath[lastIndex];

  if (lastCharacter === '/') {
    return `.${urlPath}index.html`;
  }

  return `.${urlPath}`;
};

const notFoundResponse = response => {
  const errorMessage = Buffer.from('404 Not Found');
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain;charset=utf-8');
  response.setHeader('Content-Length', errorMessage.length);
  response.write(errorMessage);
  response.end();
};

/* ACTIONS */
const actionProxyQuery = async (matches, request, response) => {
  const fullUrl = matches[0];
  const queryUrl = `https://jobs.github.com${fullUrl}`;

  https.get(queryUrl, queryResponse => {
    response.writeHead(
      queryResponse.statusCode,
      queryResponse.headers,
    );

    queryResponse.on('data', data => {
      response.write(data);
    });

    queryResponse.on('end', () => {
      response.end();
    });

    queryResponse.on('error', () => {
      response.end();
    });
  });
};

const actionServeStatic = async (matches, request, response) => {
  const filePath = pathFromURL(matches[0]);
  let fileData = fileCache[filePath];
  let fileMime = mimeTypeFromPath(filePath);

  if (fileMime === null) {
    fileMime = 'text/plain;charset=utf-8';
  }

  if (!fileData) {
    fileData = await fs.promises.readFile(filePath);
    fileCache[filePath] = fileData;
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', fileMime);
  response.write(fileData);
  response.end();
};

const actionJobPage = async (matches, request, response) => {
  const filePath = './index.html';
  let fileData = fileCache[filePath];
  let fileMime = 'text/html';

  if (!fileData) {
    fileData = await fs.promises.readFile(filePath);
    fileCache[filePath] = fileData;
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', fileMime);
  response.write(fileData);
  response.end();
};

const routes = [
  {
    regex: /^\/positions\.json\?.{1,512}/,
    action: actionProxyQuery,
  },
  {
    regex: /^\/positions\/.{1,512}\.json$/,
    action: actionProxyQuery,
  },
  {
    regex: /^\/jobs\/(.{1,512})/,
    action: actionJobPage,
  },
  {
    regex: /^\/.{0,512}$/,
    action: actionServeStatic,
  },
];

const port = process.env.PORT || 8080;
const server = http.createServer().listen(port);

server.on('request', (request, response) => {
  for (let i = 0; i < routes.length; i += 1) {
    const { regex, action } = routes[i];
    const matches = request.url.match(regex);
    if (matches !== null) {
      const promise = action(matches, request, response);
      promise.catch(() => {
        response.end();
      });

      return;
    }
  }

  notFoundResponse(response);
});

server.on('error', () => {});
