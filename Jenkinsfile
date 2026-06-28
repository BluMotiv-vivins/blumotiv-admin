pipeline {
    agent any
    environment {
        PROJECT_ID = 'blufleet-ailabs'
        REGION     = 'us-central1'
        REGISTRY   = "${REGION}-docker.pkg.dev/${PROJECT_ID}/blumotiv"
        SVC_NAME   = 'blumotiv-admin'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Auth GCP') {
            steps {
                sh "gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet"
            }
        }
        stage('Build & Push') {
            steps {
                script {
                    def buildNo = env.BUILD_NUMBER
                    sh """
                        docker build \
                            -t ${REGISTRY}/${SVC_NAME}:${buildNo} \
                            -t ${REGISTRY}/${SVC_NAME}:latest \
                            .
                        docker push ${REGISTRY}/${SVC_NAME}:${buildNo}
                        docker push ${REGISTRY}/${SVC_NAME}:latest
                    """
                }
            }
        }
        stage('Deploy to Cloud Run') {
            steps {
                script {
                    def buildNo = env.BUILD_NUMBER
                    sh """
                        gcloud run deploy ${SVC_NAME} \
                            --image ${REGISTRY}/${SVC_NAME}:${buildNo} \
                            --region ${REGION} \
                            --platform managed \
                            --allow-unauthenticated \
                            --quiet
                    """
                }
            }
        }
    }
}
