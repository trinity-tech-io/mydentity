# Deployment

## Notes

- Only run `./deployment/deploy-to-server.sh` if no major database migration or other interactive/complex operation is expected.

## Files

- `deploy-to-server.sh`: Script to run from client admin computers from the root folder, to remotely trigger a new deployment on the server.
- `deploy.sh`: Script that runs from the server, to pull latest code from git and run `deploy-real.sh`