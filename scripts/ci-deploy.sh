#!/bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e

export COMMIT_SHA1=$CIRCLE_SHA1
export SERVICE_NAME="www-joymify"

# envsubst replaces env vars in kube templates
envsubst <./kube/deployment.yml >./kube/deployment.yml.out
mv ./kube/deployment.yml.out ./kube/deployment.yml

envsubst <./kube/service.yml >./kube/service.yml.out
mv ./kube/service.yml.out ./kube/service.yml

envsubst <./kube/ingress.yml >./kube/ingress.yml.out
mv ./kube/ingress.yml.out ./kube/ingress.yml

echo "$K8S_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt

kubectl \
  --kubeconfig=/dev/null \
  --server=$K8S_CLUSTER_END_POINT \
  --certificate-authority=cert.crt \
  --token=$K8S_TOKEN \
  apply -f ./kube/
