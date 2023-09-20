# Setup

- Clone `.env.sample` to `.env.local`
- `npm i -D --legacy-peer-deps`
# Start the front end app

- `npm run dev`
- Open browser at http://localhost:4000

# Screens and routing

- Next creates navigation routes automatically using folders in the app/ folder, when a `page.tsx` file is found.
- To create a new screen, just add a similar folder, no other configuration is needed.

# Resources

- Easy way to find SVG icons: https://www.svgrepo.com/svg/521603/discover-compass
# Theme info

- The current theme was copied from https://mosaic.cruip.com/

# To check npm dependencies versions and update them all

- npx npm-check-updates
- npx npm-check-updates -u

# React server side generation howtos

## Use webpack bundle analyzer with nextjs

- `ANALYZE=true npm run build`

## "Entire page /xxx deopted into client-side rendering."

- https://nextjs.org/docs/messages/deopted-into-client-rendering
- This happens because of useSearchParams()
- Solution: encapsulate the component that uses useSearchParams() into a Suspense, so the server pages are rendered using the suspense fallback.

## Reduce page load size (server generations, until "page load")

- ie:
  - Route (app)                                Size     First Load JS
  - ├ ○ /new-identity                          1.48 kB        1.16 MB
- `ls -lS  out/_next/static/chunks`, find the large JS files, check the ones used by the big "page load screens"
- Open the target JS file and try to understand what libraries it contains, and where they are imported in the code tree