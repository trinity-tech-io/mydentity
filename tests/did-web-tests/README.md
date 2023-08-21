# Setup

- `npm i -D`

# Start the front end app

- `npm run dev`
- Open browser at http://localhost:4050

# Web connector development

- `npm link ../../../Elastos.Connectivity.Client.JS.SDK ../../../Elastos.DID.Web.Connector``

# Development troubleshooting

## Error: Elastos DID sdk(2.2.13) already loaded.

This happens when the web connector, connectivity sdk and test app all try to load different versions of the DID JS SDK (because of npm link, bad dedupe - and not working better with yarn - in fact the problem is with webpack).

- Make sure to force the resolution path of the DID JS SDK in BOTH tsconfig and next config files of this test app:
- In tsconfig: use a "paths" entry for "@elastosfoundation/did-js-sdk" to the test app's node_modules
- In next config: force webpack to resolve "@elastosfoundation/did-js-sdk" to the BROWSER library version of the current node_modules.

Without this config, webpack bundles 2 different did sdks, from the web connector's node_modules and from the test app's node_modules.