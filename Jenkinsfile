def branchName
def targetBranch

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'agms:latest' // Nom du dépôt Docker Hub et tag
        DOCKERHUB_USERNAME = "taharejeb97"
        DEV_TAG = "${DOCKERHUB_USERNAME}/agms-client:v1.0.20-dev"
        STAGING_TAG = "${DOCKERHUB_USERNAME}/agms-client:v1.0.0-staging"
        PROD_TAG = "${DOCKERHUB_USERNAME}/agms-client:v1.0.0-prod"
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: "${scm.branches[0].name}", description: 'Git branch name')
        string(name: 'CHANGE_ID', defaultValue: '', description: 'Git change ID for merge requests')
        string(name: 'CHANGE_TARGET', defaultValue: '', description: 'Git change ID for the target merge requests')
    }

    stages {
        stage('branch name') {
            steps {
                script {
                    branchName = params.BRANCH_NAME
                    echo "Current branch name: ${branchName}"
                }
            }
        }

        stage('target branch') {
            steps {
                script {
                    targetBranch = branchName
                    echo "Target branch name: ${targetBranch}"
                }
            }
        }

        stage('Git Checkout') {
            steps {
                echo 'Pulling...'
                    git branch: 'develop',
                    credentialsId: 'ipact',
                    url: 'https://github.com/ipactconsult/agms-client.git'
                echo "Git Checkout completed"
                sh 'ls -l'
            }
        }

        stage('Clean Build') {
            steps {
                nodejs('nodeJSInstallationName'){
                sh 'rm -rf node_modules'
                sh 'npm cache clean -f'
                sh 'rm -rf package-lock.json'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies"
                nodejs('nodeJSInstallationName'){
                    sh 'npm install'
                    sh 'npm install eslint@8.38.0 -f'
                    sh 'npm install prettier@2.8.7 -f'
                    sh 'npm install --save-dev eslint-config-prettier'
		            //sh 'npm install sonarqube-scanner -f'
                }
            }
        }

       /* stage('Static Test with Sonar') {
 		     when {
 			     expression {
 				     (params.CHANGE_ID != null) && ((targetBranch == 'develop') || (targetBranch == 'main') || (targetBranch == 'staging') || (targetBranch == 'test_pipeline2')|| (targetBranch == 'devTest'))
 			     }
 		    }
 		     steps{

 			    nodejs('nodeJSInstallationName'){
 				    sh 'node sonar.js'

 			     }
 		     }
 	     }*/

	    
        stage('Build Docker Image') {
            when {
                expression {
                    (params.CHANGE_ID != null) && ((targetBranch == 'develop') || (targetBranch == 'main') || (targetBranch == 'staging'))
                }
            }
            steps {
                script {
                    echo "Building Docker image"
                    withDockerRegistry(credentialsId: 'docker') {
                        if (targetBranch == 'develop') {
                            def dockerImage = docker.build("${DEV_TAG}", '-f Dockerfile .')
                            // Store the Docker image ID for subsequent steps
                            env.IMAGE_ID = dockerImage.id
                        } else if (targetBranch == 'staging') {
                            def dockerImage = docker.build("${STAGING_TAG}", '-f Dockerfile .')
                            // Store the Docker image ID for subsequent steps
                            env.IMAGE_ID = dockerImage.id
                        } else if (targetBranch == 'main') {
                            def dockerImage = docker.build("${PROD_TAG}", '-f Dockerfile .')
                            // Store the Docker image ID for subsequent steps
                            env.IMAGE_ID = dockerImage.id
                        }
                    }
                }
            }
        }


        stage('Docker Push') {
            when {
                expression {
                    (params.CHANGE_ID != null) && ((targetBranch == 'develop') || (targetBranch == 'main') || (targetBranch == 'staging'))
                }
            }
            steps {
                script {
                    echo "Pushing Docker image to Docker Hub"
                     withDockerRegistry(credentialsId: 'docker') {
                        sh "docker push ${DOCKERHUB_USERNAME}/agms-client --all-tags"
                    }
                }
            }
        }

        stage('Remove Containers') {
            when {
                expression {
                    (params.CHANGE_ID != null) && ((targetBranch == 'develop') || (targetBranch == 'main') || (targetBranch == 'staging'))
                }
            }
            steps {
                sh '''
                    container_ids=$(docker ps -q --filter "publish=4048/tcp")
                    if [ -n "$container_ids" ]; then
                        echo "Stopping and removing containers..."
                        docker stop $container_ids
                        docker rm $container_ids
                    else
                        echo "No containers found using port 4048."
                    fi
                '''
            }
        }

        stage('Deploy to test [Develop]') {
            when {
                expression {
                    (params.CHANGE_ID != null) && (targetBranch == 'develop')
                }
            }
            steps {
                sh "sudo ansible-playbook ansible/k8s.yml -i ansible/inventory/host.yml"
            }
        }
    }
}
