pipeline {
    agent any

    environment {
    BACKEND_IMAGE = "rahulltelkar/platform-api"
    FRONTEND_IMAGE = "rahulltelkar/platform-frontend"

    BACKEND_RELEASE = "platform-api"
    FRONTEND_RELEASE = "platform-frontend"

    IMAGE_TAG = "${BUILD_NUMBER}"
    NAMESPACE = "platform-demo"
}

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
    parallel {

        stage('Build Backend') {
            steps {
                sh """
                    docker build \
                      -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                      -t ${BACKEND_IMAGE}:latest \
                      ./backend
                """
            }
        }

        stage('Build Frontend') {
            steps {
                sh """
                    docker build \
                      -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                      -t ${FRONTEND_IMAGE}:latest \
                      ./frontend
                """
            }
        }
    }
}

        stage('Trivy Scan') {

    steps {

        sh '''
            echo "Scanning Backend Image..."

            trivy image \
                --severity HIGH,CRITICAL \
                --exit-code 0 \
                ${BACKEND_IMAGE}:${IMAGE_TAG}

            echo "Scanning Frontend Image..."

            trivy image \
                --severity HIGH,CRITICAL \
                --exit-code 0 \
                ${FRONTEND_IMAGE}:${IMAGE_TAG}
        '''
    }
}

        stage('Push Images') {

    steps {

        withCredentials([usernamePassword(
            credentialsId: 'docker-hub',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {

            sh """
                echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin

                docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                docker push ${BACKEND_IMAGE}:latest

                docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                docker push ${FRONTEND_IMAGE}:latest

                docker logout
            """
        }
    }
}

        stage('Helm Lint') {
    steps {
        sh """
            helm lint helm/platform-api
            helm lint helm/platform-frontend
        """
    }
}

        stage('Helm Template') {
    steps {
        sh """
            helm template ${BACKEND_RELEASE} helm/platform-api

            helm template ${FRONTEND_RELEASE} helm/platform-frontend
        """
    }
}
        stage('Install Cluster Addons') {

    steps {

        sh '''

        VPC_ID=$(aws eks describe-cluster \
            --name platform-demo-eks \
            --region ap-south-1 \
            --query "cluster.resourcesVpcConfig.vpcId" \
            --output text)

        if [ -z "$VPC_ID" ]; then
            echo "ERROR: Failed to discover VPC ID"
            exit 1
        fi

        echo "Detected VPC ID: $VPC_ID"

        helm repo add eks https://aws.github.io/eks-charts || true
        helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server || true

        helm repo update

        helm upgrade --install metrics-server \
            metrics-server/metrics-server \
            -n kube-system

        helm upgrade --install aws-load-balancer-controller \
            eks/aws-load-balancer-controller \
            -n kube-system \
            -f helm/aws-load-balancer-controller/values.yaml \
            --set vpcId=$VPC_ID

        '''
    }
}

        stage('Deploy to EKS') {

    steps {

        sh """
            helm upgrade --install ${BACKEND_RELEASE} \
                helm/platform-api \
                --namespace ${NAMESPACE} \
                --create-namespace \
                --set image.repository=${BACKEND_IMAGE} \
                --set image.tag=${IMAGE_TAG}

            helm upgrade --install ${FRONTEND_RELEASE} \
                helm/platform-frontend \
                --namespace ${NAMESPACE} \
                --set image.repository=${FRONTEND_IMAGE} \
                --set image.tag=${IMAGE_TAG}
            helm upgrade --install platform-ingress \
                helm/platform-ingress \
                --namespace ${NAMESPACE}
        """
    }
}

        stage('Smoke Test') {
    steps {
        sh '''
            echo "Waiting for ALB..."

            for i in {1..30}; do

                ALB=$(kubectl get ingress platform-ingress \
                  -n ${NAMESPACE} \
                  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

                if [ -n "$ALB" ]; then
                    break
                fi

                echo "ALB not ready yet... waiting 10 seconds"
                sleep 10
            done

            if [ -z "$ALB" ]; then
                echo "ERROR: ALB was not created."
                kubectl describe ingress platform-ingress -n ${NAMESPACE}
                exit 1
            fi

            echo "ALB: $ALB"

            echo "Testing Backend Health..."

            curl --fail http://$ALB/api/health
        '''
    }
}

                stage('Load Test') {
    steps {
        sh '''
            echo "Getting ALB hostname..."

            ALB=$(kubectl get ingress platform-ingress \
              -n ${NAMESPACE} \
              -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

            echo "Running k6 against http://$ALB"

            k6 run --env BASE_URL=http://$ALB k6/load.js
        '''
    }
}

    }

    post {
    success {
        echo 'Pipeline completed successfully.'
    }

    failure {
        echo 'Deployment failed. Rolling back Helm release...'

        sh '''
            helm rollback platform-api -n ${NAMESPACE} || true
            helm rollback platform-frontend -n ${NAMESPACE} || true
            helm rollback platform-ingress -n ${NAMESPACE} || true
        '''
    }

    always {
        cleanWs()
    }
}

}
