echo "Install"
npm install
echo "Build"
webpack
jekyll build
echo "Run"
jekyll serve