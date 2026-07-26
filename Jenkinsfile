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
            kubectl rollout status deployment/platform-api -n ${NAMESPACE} --timeout=120s
            kubectl rollout status deployment/platform-frontend -n ${NAMESPACE} --timeout=120s

            echo "Getting ALB hostname..."

            ALB=$(kubectl get ingress platform-ingress \
               -n ${NAMESPACE} \
               -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

            echo "ALB: $ALB"

            echo "Testing Frontend..."
            curl --fail http://$ALB/api/health

            echo "Testing Frontend..."
            curl --fail http://$ALB

            echo "Smoke Test Passed"
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
