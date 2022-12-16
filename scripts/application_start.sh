echo 'run application_start.sh: ' >> /home/ec2-user/example-express-api/deploy.log

echo 'docker compose up -d' >> /home/ec2-user/example-express-api/deploy.log
docker compose up -d >> /home/ec2-user/example-express-api/deploy.log