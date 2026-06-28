pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'blufleet/admin'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE}:latest .'
            }
        }
        stage('Deploy') {
            steps {
                // Stop and remove old container if it exists
                sh 'docker rm -f blufleet-admin || true'
                // Run new container on port 5176 (or 80 based on deployment needs)
                sh 'docker run -d --name blufleet-admin --restart unless-stopped -p 5176:80 ${DOCKER_IMAGE}:latest'
            }
        }
    }
}
