### Codespark Take Home Test

Code on AWS EC2 Instance using Mongo Atlas database

http://ec2-52-53-148-160.us-west-1.compute.amazonaws.com:3000/


#### Installation

1. git clone https://github.com/istvanskeri/codespark.git

2. Run npm install on both /server  and /react directories

3. Issue yarn build command in /react directory to build our react app

3. Create .env file in /server directory and add the following
    
    MONGO=mongodb://localhost/codespark

4. Run the seeder file in the /server folder with node seeder.js command. This will populate your db collection from csv files. 

5. Start the node server with npm start
