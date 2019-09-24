Steps to Containerise a sample application


```

cd ~/environment

git clone https://github.com/vijay-khanna/containers-basics-and-beyond.git

cd ~/environment/containers-basics-and-beyond/sample-app/

```
Basic Test locally

```
npm install 
node app-sample-app.js 8081

## From Another Terminal
curl localhost:8081/stats
```

Containerize and Push to Repo

```
$(aws ecr get-login --region us-east-1 --no-include-email)

frontEndRepoECR=$(echo $frontEndRepoECRURI | awk -F'/' '{print $2}')
echo $frontEndRepoECR

#---Check if Repo Exists, else create. If Exist, then update variable 'sampleAppURI' with the REPO URI

sampleAppURI=$(aws ecr create-repository --repository-name sample_app_stats_ver1 | jq -r  '.repository.repositoryUri')
echo "export sampleAppURI=${frontEndRepoECRURI}" >> ~/.bash_profile
echo $sampleAppURI



```

