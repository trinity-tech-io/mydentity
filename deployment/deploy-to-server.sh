echo "LOCAL EXECUTION"
echo ""

# Usage is from args parse lines
usage() { echo "$0 usage:" && grep " .)\ #" $0; exit 0; }

# If no args print usage
[ $# -eq 0 ] && usage

build_client=false
build_tests=false
do_deploy=false
commit_push=false
remote_executiion=false

while getopts "ctdprh" flag; do
    case ${flag} in
        c) # Build the client
          build_client=true
          ;;
        t) # Build the tests
          build_tests=true
          ;;
        d) # Deploy tars of app and tests to prod.
          do_deploy=true
          ;;
        p) # Commit and push
          commit_push=true
          ;;
        r) # Remote execution
          remote_executiion=true
          ;;
        h | *) # Display this help
          usage
          ;;
    esac
done

# echo $build_client $build_tests $commit_push $remote_executiion
# exit 0;

# Build the client dist locally
if [ $build_client = true ]
then
  echo "Building client apps locally"

  cd client/did-web-service
  npm i --legacy-peer-deps
  npm run build
  cd ../..
else
  echo "Not building client locally as requested"
fi

# Build the tests dist locally
if [ $build_tests = true ]
then
  echo "Building tests apps locally"

  cd sdk
  npm i
  cd ..

  cd tests/did-web-tests
  npm i
  npm run build
  cd ../..
else
  echo "Not building tests locally as requested"
fi

# Deploy app and tests tar files to prod.
if [ $do_deploy = true ]
then
  echo "Deploy app and tests tar files to prod."

  # rm -f app.tar.gz tests.tar.gz

  cd client/did-web-service
  tar zcvf ../../app.tar.gz out
  cd ../..

  cd tests/did-web-tests
  tar zcvf ../../tests.tar.gz out
  cd ../..

  # scp app.tar.gz did-web-service:~/
  # scp tests.tar.gz did-web-service:~/
  # rm -f app.tar.gz tests.tar.gz
else
  echo "Not deploy app and tests tar files to prod. as requested."
fi

# Push git folder to git
if [ $commit_push = true ]
then
  echo "Pushing built clients and tests to git"
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
