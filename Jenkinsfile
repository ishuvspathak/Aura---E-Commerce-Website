pipeline {
    agent any

    stages {
        stage('Checkout Source') {
            steps {
                echo 'Checking out code from Git Repository...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing packages...'
                bat 'npm install --legacy-peer-deps'
            }
        }
        
        stage('Static Analysis (Lint)') {
            steps {
                echo 'Running lint check...'
                bat 'npm run lint'
            }
        }

        stage('Build Production Assets') {
            steps {
                echo 'Compiling React static build...'
                bat 'npm run build'
            }
        }
    }
    
    post {
        success {
            echo 'Build compiled successfully! Deployment assets are ready.'
        }
        failure {
            echo 'Build failed. Please inspect console logs.'
        }
    }
}
