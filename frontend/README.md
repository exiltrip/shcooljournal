# привет!
сдесь находится инструкция для установки в среде ubuntu 20.04 и краткая экскурсия по проекту

# инструкция по установке

#### для начала установим зависимости проекта и забилдим его:

`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`

`sudo apt-get install nodejs`

`cd frontend`

`sudo npm i`

`sudo npm i pm2 -g`

`pm2 npm run build`

`pm2 save`
