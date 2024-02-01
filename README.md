# Next PATH

Port Authority Trans-Hudson trains real-time departure information. Created with [Next.js](https://nextjs.org/) and [React](https://react.dev/). Train data obtained from PANYNJ website. This project has no affiliation with Port Authority of New York and New Jersey.


## Serve Data

Due to the CORS policy, a server providing the train data is required to run the app. The server is expected to fetch data from `https://www.panynj.gov/bin/portauthority/ridepath.json`.

For example, if your server runs `nginx`, add the configuration below to your nginx config file. Replace `[PATH]` with your custom path.

```
location [PATH] {
  proxy_ssl_server_name on;
  proxy_pass https://www.panynj.gov/bin/portauthority/ridepath.json;
  add_header Access-Control-Allow-Origin *; # optional, required when data server runs under a different domain than the web server
  add_header Cache-Control 'no-store, no-cache'; # optional
}
```

After the data server is configured, fill in the server URL inside `dataConfig.path_data_source` at `next.config.mjs`.

## Usage

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Additionally, to export a static website, execute:

```bash
npm run build
```

The web page relies partly on the client's system time to calculate departure information. All data is for reference purposes only, and is subject to real-world conditions.