echo "LOCAL EXECUTION"
echo ""

echo "Usage: $0 [-n]"
echo "-n: Don't build the client"
echo ""

build=true
while getopts n flag
do
    case "${flag}" in
        n) build=false;;
    esac
done

if [ $build = true ]
then
  # Build the client dist locally
  echo "Building client apps locally"

  cd client/did-web-service
  npm run build
  cd ../..

  # Push git folder to git
  echo "Pushing built clients to git"
  git add .
  git commit -m "Production build"
  git push
else
  echo "Not building client locally as requested"
fi

echo ""

echo "REMOTE EXECUTION"
echo ""

# Execute remote deployment
# ssh root@didweb-service 'bash -s' < deployment/deploy.sh