# Third party API keys setup

## Microsoft auth

- Create azure dev account at: https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
- Portal after sign up: https://portal.azure.com/#home
- Account:
  - tech-accounts@mingler.io
- Register an app: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
  - or search for "App registrations"
- Configure name, logo, home page url
- Verify domain
- Add redirect uri for localhost and prod urls.
- Create a client secret and copy the secret into .env

## Google auth

- Google account created:
  - tech-accounts@mingler.io
  - ben's china phone number
- https://console.developers.google.com/apis
- Create project: Mingler - no organization
- Configure consent screen
  - mingler.io app domain, contact email, add email and profile scopes
- Add test users (while app is "in testing")
- Open credentials page, create oauth client ID
  - Authorized JS origins: http://localhost:4000
  - Authorized redirect url: http://localhost:4000/oauth/google/redirect
  - Save client ID and client secret to .env
- Verify domain on https://search.google.com/search-consol
- Apply for published (verified) app

## LinkedIn auth

- https://developer.linkedin.com/ -> https://www.linkedin.com/developers/apps/new
- Create app
  - Created with Ben's linkedin account
  - Use company page:
    - https://www.linkedin.com/company/trinity-tech-io/
    - (Admin: Ben)
  - Get auth client and secret from the auth tab
  - Add "Authorized redirect URLs for your app":
    - http://localhost:4000/oauth/linkedin/redirect
    - https://staging.ownmydentity.com/oauth/linkedin/redirect
    - https://ownmydentity.com/oauth/linkedin/redirect
