# WebAnalyticsImplementations

- [API](#api)
  - [Configuration](#configuration)
  - [Development](#development)

## API

### Configuration

The API url is set via the `src/environments/environments.ts`.
For different environments adjust accordingly i. E. `environment.prod.ts`.

### Development

While development client and server will lead to a security error in the browser.

To mitigate that in the `development` configuration a proxy is set up for the server.

The proxy can be configured in the `proxy.conf.json`

```json
{
  "/api": {
    "target": "http://localhost:<server-port>",
    "secure": false
  }
}
```

Also it needs to be provided in the `angular.json` for the build configuration

```json
// more json
"serve": {
  "configurations": {
    "development": {
      "buildTarget": "web_analytics_implementations:build:development",
      "proxyConfig": "proxy.conf.json" // <-- set here
    }
    // more configurations
  }
}
```

> Important! You need to rebuild the client (i. E. `ng server`) if you change the proxy configs!
