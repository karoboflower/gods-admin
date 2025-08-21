import groovy.json.JsonOutput
def getCommitMessage() {
    def proc = "git log -1 --pretty=%B".execute(null, new File(env.WORKSPACE))
    proc.waitFor()
    return proc.in.text.trim()
}
pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/nodejs:18-2022'
      args '-v /root/.m2:/root/.m2 -v /usr/bin/docker:/usr/bin/docker -v /var/run/docker.sock:/var/run/docker.sock'
    }


  }
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }
    stage('依赖漏洞扫描') {
      steps {
        npmAuditInDir(directory: '/', collectResult: true)
      }
    }
    stage('构建镜像并推送到 CODING Docker 制品库') {
      steps {
        script {
          docker.withRegistry(
            "${CCI_CURRENT_WEB_PROTOCOL}://${CODING_DOCKER_REG_HOST}",
            "${CODING_ARTIFACTS_CREDENTIALS_ID}"
          ) {
            // fix me 正式环境无自动化部署，先改一下
            def envValue
            if (BRANCH == 'test-master') {
                 envValue = 'build:test'
              } else if(BRANCH == 'release'){
                 envValue = 'build:release'
              } else if(BRANCH == 'master'){
                envValue = 'build'
              }
              def dockerImage = docker.build("${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}", "-f ${DOCKERFILE_PATH} ${DOCKER_BUILD_CONTEXT} --build-arg ENV=${envValue}");
              def containerId = dockerImage.run("-d --name my-app-container").id
              if(BRANCH == 'master'){
                sh 'rm -rf /server/public/*'
                sh "docker cp my-app-container:${WORK_DIR}/. ./server/public"
              } else {
                 sh "docker cp my-app-container:${WORK_DIR}/. ./dist"
              }
              sh "docker rm -f ${containerId}"
          }
        }
      }
    }

    stage('推送打包文件到仓库') {
      steps {
         script {
          def BRANCH_ID = "${BRANCH}"
          def GIT_URL = "https://${PROJECT_TOKEN_GK}:${PROJECT_TOKEN}@e.coding.net/serverless-100013832940/babydontcry/babydontcry_admin.git"
          if (BRANCH_ID == 'master') {
            sh "chmod +x build.sh"
            // sh "./build.sh patch ${GIT_URL}"
            sh "./build.sh"
            sh "git push ${GIT_URL} --tags"
            // 推送到public分支作为tag记录 暂时强推 tag作为报错记录
            sh "git push ${GIT_URL} HEAD:public -f"
          }
        }
      }
    }

    stage('部署到远端服务') {
      steps {
        script {
          def remoteConfig = [:]
          // 根据不同的分支上传到不同的远端服务器
          // def CRED_ID = "${REMOTE_CRED}"
          def CRED_ID = ""
          def CRED_HOST = "${REMOTE_HOST}"
          def CRED_PORT = "${REMOTE_SSH_PORT}"
          def BRANCH_ID = "${BRANCH}"
          // 测试分支
          if (BRANCH_ID == 'test-master') {
            CRED_ID = "${TEST_REMOTE_CORD}"
            CRED_HOST = "${TEST_REMOTE_HOST}"
            CRED_PORT = "${TEST_REMOTE_SSH_PORT}"
            DEPLOY_DIR = '/home/ubuntu/workspace/babydontcry/admin/test'
            sh 'echo "测试环境"'
          }
          //预发布分支
          if (BRANCH_ID == 'release') {
            CRED_ID = "${TEST_REMOTE_CORD}"
            CRED_HOST = "${TEST_REMOTE_HOST}"
            CRED_PORT = "${TEST_REMOTE_SSH_PORT}"
            DEPLOY_DIR = '/home/ubuntu/workspace/babydontcry/admin/release'
            sh 'echo "预发布环境"'
          }
           //正式分支
          if (BRANCH_ID == 'master') {
            return;
          }
          remoteConfig.name = "my-remote-server"
          remoteConfig.host = "${CRED_HOST}"
          remoteConfig.port = "${CRED_PORT}".toInteger()
          remoteConfig.allowAnyHosts = true
          withCredentials([usernamePassword(
            credentialsId: "${CRED_ID}",
            passwordVariable: 'password',
            usernameVariable: 'userName'
          ), usernamePassword(
            credentialsId: "${CODING_ARTIFACTS_CREDENTIALS_ID}",
            usernameVariable: 'CODING_DOCKER_REG_USERNAME',
            passwordVariable: 'CODING_DOCKER_REG_PASSWORD'
          )]) {
            // SSH 登录用户名
            remoteConfig.user = userName
            remoteConfig.password = password
            sh "cd ./dist && zip -r ../dist.zip ./*"
            sshCommand(
              remote: remoteConfig,
              command: "sudo rm -rf ${DEPLOY_DIR}/assets",
              sudo: true,
            )
            sshPut(
              remote: remoteConfig,
              from: 'dist.zip',
              into: "${DEPLOY_DIR}",
              sudo: true
            )
             sshCommand(
              remote: remoteConfig,
              command: "sudo unzip -o ${DEPLOY_DIR}/dist.zip -d ${DEPLOY_DIR}",
              sudo: true,
            )
            // DOCKER_IMAGE_VERSION 中涉及到 GIT_LOCAL_BRANCH / GIT_TAG / GIT_COMMIT 的环境变量的使用
            // 需要在本地完成拼接后，再传入到远端服务器中使用
            echo "文件列表："
            echo "cd ${DEPLOY_DIR}  && sudo ls "
            echo "部署成功"
          }
        }

      }
    }
  }
  environment {
    CODING_DOCKER_REG_HOST = "${CCI_CURRENT_TEAM}-docker.pkg.${CCI_CURRENT_DOMAIN}"
    CODING_DOCKER_IMAGE_NAME = "${PROJECT_NAME.toLowerCase()}/${DOCKER_REPO_NAME}/${DOCKER_IMAGE_NAME}"
    BRANCH = "${GIT_LOCAL_BRANCH}"
  }
  post {
    success {
      script{
        def BRANCH_ID = "${BRANCH}"
        def title = ""
        def at = ""
        // 王龙 15279193505 沫鑫 15210199165
        if (BRANCH_ID == 'test-master') {
          title = """测试环境更新成功,可测试 \n 项目地址： https://babydontcry-web.wegui.cn/index.html#/"""
          at = ["15279193505"]
        }
        if (BRANCH_ID == 'release') {
          title = """预发布环境打包成功,可验收 \n 项目地址：https://babydontcry-web-pre.wegui.cn/index.html#"""
          at = ["15279193505"]
        }
        if (BRANCH_ID == 'master') {
          title = """正式环境打包成功,可更新 \n 项目地址：https://admin.tengxb.com/#"""
          at = ["15279193505","15210199165"]
        }
        def data = [
          msgtype: "text",
          at: [
            isAtAll: false,
            atMobiles: at,
          ],
          text: [
            content: """ 事件：${title} \n 推送者：${env.GIT_COMMITTER_NAME} \n 分支：${env.GIT_BRANCH} \n Commit：${getCommitMessage()}"""
          ]
        ]
        def jsonString = JsonOutput.toJson(data)
        echo "jsonString: ${jsonString}"
        def response = httpRequest(
          httpMode: 'POST',
          acceptType: 'APPLICATION_JSON',
          contentType: 'APPLICATION_JSON',
          url: "https://oapi.dingtalk.com/robot/send?access_token=173bdb4ce4487af708f5bc760945dec29b0bc52fb19ededaf5b7915881cca2e7",
          requestBody: jsonString
        )
        echo "Response: ${response.content}"
      }
    }
  }
}