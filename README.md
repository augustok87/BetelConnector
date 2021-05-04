# BetelConnector

This is a small network for Betel Church youth group, at Buenos Aires Argentina
It shows members contacts info, and a post section where they can share ideas.


The repo as it is is best suited to deploy to Heroku.
To do this please create in your personal heroku account and follow the steps for deployment.
https://dashboard.heroku.com/apps

If you wish to run this locally at your machine follow these steps:
1. In an empty folder git clone git@github.com:augustok87/BetelConnector.git
2. Delete "default.json" from .gitignore
3. change "production.json" to "default.json" at /config
3. npm install
4. npm run heroku-postbuild
5. npm run dev to get the page open at localhost:3000
