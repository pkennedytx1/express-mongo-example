echo 'run after_install.sh: ' >> /home/ec2-user/example-express-api/deploy.log

echo 'cd /home/ec2-user/example-express-api' >> /home/ec2-user/example-express-api/deploy.log
cd /home/ec2-user/example-express-api >> /home/ec2-user/example-express-api/deploy.log

echo 'npm install' >> /home/ec2-user/example-express-api/deploy.log 
npm install >> /home/ec2-user/example-express-api/deploy.log