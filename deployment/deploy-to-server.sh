echo "LOCAL EXECUTION"
echo ""

echo "Usage: $0 [-c] [-t] [-p] [-r]"
echo "-c: Build the client"
echo "-t: Build the tests"
echo "-p: Commit and push"
echo "-r: Remote execution"
echo ""

build_client=false
build_tests=false
commit_push=false
remote_executiion=false

while getopts ":c:t:p:r:" flag; do
    case "${flag}" in
        c) build_client=true ;;
        t) build_tests=true ;;
        p) commit_push=true ;;
        r) remote_executiion=true ;;
        *) echo "Contains invalid option" ;;
    esac
done

# Build the client dist locally
if [ $build_client = true ]
then
  echo "Building client apps locally"

  cd client/did-web-service
  npm run build
  cd ../..

  # # Push git folder to git
  # echo "Pushing built clients to git"
  # git add .
  # git commit -m "Production build"
  # git push
else
  echo "Not building client locally as requested"
fi

# Build the tests dist locally
if [ $build_tests = true ]
then
  echo "Building tests apps locally"

  cd tests/did-web-tests
  npm run build
  cd ../..

  # # Push git folder to git
  # echo "Pushing built clients to git"
  # git add .
  # git commit -m "Production build"
  # git push
else
  echo "Not building tests locally as requested"
fi

# Push git folder to git
if [ $commit_push = true ]
then
  echo "Pushing built clients to git"
  git add .
  git commit -m "Production build"
  git push
else
  echo "Not commit and push to git"
fi

# Execute remote deployment
if [ $remote_executiion = true ]
then
  ssh -t did-web-service 'sudo -s && bash -s' < deployment/deploy.sh
else
  echo "Not execute remote deployment"
fi