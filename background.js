const BLOCKED_DOMAINS =
[
  'ssl.google-analytics.com',
  'www-google-analytics.l.google.com',
  'stats.g.doubleclick.net',
  'clients.l.google.com',
  'pagead.l.doubleclick.net',
  'www-googletagmanager.l.google.com',
  'googleadapis.l.google.com',
  'pagead.googlesyndication.com',
  'pagead2.googlesyndication.com',
  'cm.g.doubleclick.net'
];

function extract_domain(url)    {
  let matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return matches[1];
}

browser.webRequest.onBeforeRequest.addListener(function(details) {
  let domain = extract_domain(details.url);
  return { cancel: BLOCKED_DOMAINS.includes(domain) };
}, { urls: ["<all_urls>"]},["blocking"] );

