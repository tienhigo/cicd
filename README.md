Triển khai React và Node.js website với DigitalOcean server, nginx và Github Action CI/CD


Tạo folder project:

    npm init
    
    npm i express

Tạo Node.js server: 

set port 5000 cho server run trong file app.js

    app.listen(5000, () => {
        console.log("server is running on port 5000")
    })

Tạo React app:

    npx create-react-app frontend

vào file package.json của project:

    "scripts": {
        "start": "node app.js"
      },
  
    npm start

sau khi chạy web lên localhost thì bắt đầu push project lên Github.


Tạo Github Repo:

Vào Github tạo New Repository

vào lại folder project:

    git remote add origin link_repo_vừa_tạo

tạo 1 file .gitignore với nội dung là node_modules để thư mục node_modules không được oush lên Github

vào terminal của folder project:

    git add .

    git commit –m ‘test’

    git push origin master

Project sẽ được push thành công lên Github.

Tạo Linnux Server trên DigitalOcean:

    Vào website DigitalOcean ==>Bấm nút Create chọn Droplets ==> chọn Ubuntu ==>Choose a plan==>Chọn data center region gần nhất==>Authentication chọn Password rồi nhập password vào==>Finalize and Create: 1 droplets và đặt tên cho hostname==>Create droplets

Sau khi tạo xong thì ta sẽ có được địa chỉ IP để log in vào server đó

Ip adress: 167.71.214.106

Vào droplet console để connect bằng password đã set.

    sudo apt update
    
    sudo apt install nodejs

Thiết lập cấu hình Reverse Proxy – Nginx:  

    server {    
            root /var/www/mywebsite/_work/cicd/cicd; 
            index index.html index.htm index.nginx-debian.html; 
            server_name 167.71.214.106; 
            location / {
            
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1; 
        proxy_set_header Upgrade $http_upgrade; 
        proxy_set_header Connection 'upgrade'; 
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }


Script Workflow CI/CD:

    name: Node.js CI
    
    on:
      push:
        branches: [ "master" ]
      pull_request:
        branches: [ "master" ]
    
    jobs:
      build:
    
        runs-on: self-hosted
    
        strategy:
          matrix:
            node-version: [16.x, 18.x]
            # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
    
        steps:
        - uses: actions/checkout@v4
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v3
          with:
            node-version: ${{ matrix.node-version }}
            cache: 'npm'
        - run: |
            npm i
            cd frontend
            npm i
            CI='' npm run build
            npm run test
            cd ..
            pm2 stop 0
            pm2 start 0
            pm2 save
            sudo service nginx restart
        

