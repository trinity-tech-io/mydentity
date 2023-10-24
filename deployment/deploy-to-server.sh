echo "LOCAL EXECUTION"
echo "Usage example(build client staging): $0 -s"

# Usage is from args parse lines
usage() { echo "$0 usage:" && grep " .)\ #" $0; exit 0; }

# If no args print usage
[ $# -eq 0 ] && usage

log_tag='>>>>>> [deploy-to-server.sh] '
build_client=false # prod
build_tests=false # prod
build_client_staging=false
do_deploy_client_staging=false
do_deploy_client_prod=false
do_deploy_tests_prod=false
commit_push=false
remote_executiion=false

while getopts "cstdefprh" flag; do
    case ${flag} in
        c) # Build the client prod
          build_client=true
          ;;
        s) # Build the client staging
          build_client_staging=true
          ;;
        t) # Build the tests prod
          build_tests=true
          ;;
        d) # Deploy client_staging.tar.gz to vps.
          do_deploy_client_staging=true
          ;;
        e) # Deploy client_prod.tar.gz to vps.
          do_deploy_client_prod=true
          ;;
        f) # Deploy test_prod.tar.gz to vps.
          do_deploy_tests_prod=true
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

#########################################################################################
# echo $build_client $build_tests $commit_push $remote_executiion
# exit 0;
#########################################################################################

ROOT_DIR=`pwd`

# Build the client dist locally
if [ $build_client = true ]
then
  echo "${log_tag} Building client apps locally"

  cd client/did-web-service
  npm i --legacy-peer-deps
  npm run build
  cd ../..
else
  echo "${log_tag} Not building client locally as requested"
fi

# Build the client staging dist locally
if [ $build_client_staging = true ]
then
  echo "${log_tag} Building client staging app locally"

  cd client/did-web-service
  npm i --legacy-peer-deps
  npm run build:staging
  cd ../..
else
  echo "${log_tag} Not building client locally as requested"
fi

# Build the tests dist locally
if [ $build_tests = true ]
then
  echo "${log_tag} Building tests apps locally"

  cd sdk
  npm i
  cd ..

  cd tests/did-web-tests
  npm i
  npm run build
  cd ../..
else
  echo "${log_tag} Not building tests locally as requested"
fi

# Usage: deploy_tar <source_folder> <tar_file_name>
#   ex: deploy_tar "client/did-web-service" client_staging
function deploy_tar() {
  source_folder=$1
  tar_file_name=$2

  echo "${log_tag} Deploy ${tar_file_name}.tar.gz to vps."

  rm -f ${tar_file_name}.tar.gz

  cd ${ROOT_DIR}/${source_folder}
  tar zcvf ${tar_file_name}.tar.gz out

  scp ${tar_file_name}.tar.gz did-web-service:~/

  rm -f ${tar_file_name}.tar.gz
}

if [ $do_deploy_client_staging = true ]
then
  deploy_tar client/did-web-service client-staging
else
  echo "${log_tag} Not client-staging.tar.gz to vps."
fi

if [ $do_deploy_client_prod = true ]
then
  deploy_tar client/did-web-service client-prod
else
  echo "${log_tag} Not client-prod.tar.gz to vps."
fi

if [ $do_deploy_tests_prod = true ]
then
  deploy_tar tests/did-web-tests test-prod
else
  echo "${log_tag} Not test-prod.tar.gz to vps."
fi

# Push git folder to git
if [ $commit_push = true ]
then
  echo "${log_tag} Pushing built clients and tests to git"

  cd ${ROOT_DIR}
  git add .
  git commit -m "Production build"
  # git push
else
  echo "${log_tag} Not commit and push to git"
fi

# Execute remote deployment
if [ $remote_executiion = true ]
then
  cd ${ROOT_DIR}
  ssh -t did-web-service 'sudo -s && bash -s' < deployment/deploy.sh
else
  echo "${log_tag} Not execute remote deployment"
fi
