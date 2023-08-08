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