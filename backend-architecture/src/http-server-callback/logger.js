const {accessLogsDb} = require('../data-access/mongo');
const apiList = require('../config/apis.json');
const UrlPattern = require('url-pattern');
const url = require('url');
const moment = require('moment');

function removeCircular(ref, map) {
  let refmap;
  if (!map) {
    refmap = new Map();
  } else {
    refmap = map;
  }
  refmap.set(ref, 1);
  for (const i in ref) {
    if (refmap.get(ref[i])) delete(ref[i]);
    else if (typeof ref[i] === 'Object') removeCircular(ref[i], refmap);
  }
  return ref;
}

async function logAPI({httpRequest, httpResponse, isTimedOut}) {
  let api = '';
  let apiId = '';
  let matchParameters = {};
  const apisList = Object.keys(apiList[httpRequest.method]);

  for (let i = 0, n = apisList.length; i < n; i++) {
    const urlData = (url.parse(httpRequest.path))['pathname'].replace(/\/$/, '');
    const match = new UrlPattern(apisList[i], {
      'segmentValueCharset': '.@a-zA-Z0-9_-',
    }).match(urlData);
    if (match) {
      api = apisList[i];
      apiId = apiList[httpRequest.method][apisList[i]]['id'];
      matchParameters = match;
      break;
    } else if (httpResponse && httpResponse['status'] === 'failure') {
      api = httpRequest.url;
      apiId = 1000;
    }
  }
  const origin = httpRequest.headers['user-agent'].toLowerCase().includes('postman') ? 'developer' : 'web';
  const payload = {
    uuid: httpRequest['uuid'],
    client: 'cadence_api',
    email: httpRequest['user']['email'],
    api: api,
    apiId: apiId || '',
    apiMethod: httpRequest['method'].toLowerCase(),
    origin,
    startTime: httpRequest.startTime,
    responseTime: moment().valueOf() - httpRequest['startTime'],
    type: httpResponse && httpResponse['statusCode'] && httpResponse['statusCode'] === 200 ? 'success' : 'failure',
    isTimedOut: isTimedOut || false,
    responseSize: httpResponse ? Buffer.byteLength(JSON.stringify(httpResponse)) : 0,
  };

  const reqResPayload = {
    uuid: httpRequest['uuid'],
    inputParameter: Object.assign(matchParameters, httpRequest.body, httpRequest.query, httpRequest.headers),
    output: httpResponse,
  };
  await accessLogsDb.addAccessLog({payload, reqResPayload});
}

async function thirdPartyLogs({httpRequest, xml, response, thirdPartyUrl, sampleHeaders, isTimedOut}) {
  let api = '';
  let apiId = '';
  const apisList = Object.keys(apiList[httpRequest.method]);

  for (let i = 0, n = apisList.length; i < n; i++) {
    const urlData = (url.parse(httpRequest.path))['pathname'].replace(/\/$/, '');
    const match = new UrlPattern(apisList[i], {
      'segmentValueCharset': '.@a-zA-Z0-9_-',
    }).match(urlData);
    if (match) {
      api = apisList[i];
      apiId = apiList[httpRequest.method][apisList[i]]['id'];
      break;
    } else if (response && response['status'] === 'failure') {
      api = httpRequest.url;
      apiId = 1000;
    }
  }
  const origin = httpRequest.headers['user-agent'].toLowerCase().includes('postman') ? 'developer' : 'web';
  const payload = {
    uuid: httpRequest['uuid'],
    client: 'cadence_api',
    email: httpRequest['user']['email'],
    api: api,
    apiId: apiId || '',
    apiMethod: httpRequest['method'] ? httpRequest['method'].toLowerCase() : 'post',
    origin,
    startTime: httpRequest.startTime,
    responseTime: moment().valueOf() - httpRequest['startTime'],
    type: response && response['statusCode'] && response['statusCode'] === 200 ? 'success' : 'failure',
    isTimedOut: isTimedOut || false,
    responseSize: response ? Buffer.byteLength(JSON.stringify(response)) : 0,
    inputParameter: {...Object.assign(sampleHeaders, httpRequest.headers), ...{thirdPartyUrl}},
    requestData: xml,
    output: {
      body: response.body,
    },
  };
  await accessLogsDb.addThirdPartyLogs({payload});
}

module.exports = Object.freeze({
  logAPI,
  thirdPartyLogs,
});
