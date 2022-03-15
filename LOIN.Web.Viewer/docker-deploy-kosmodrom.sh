# vytvor produkcni build
#npm run-script build-prod
npm run-script build-kosmodrom


# vytvor novou image
docker build -t trilogic/cas-bim-dss-frontend .

# natlac image do repositare
docker push trilogic/cas-bim-dss-frontend

# stouchni do portaineru, aby tuto services aktualizoval
curl -X POST https://portainer.swarm.kosmodrom.cz/api/webhooks/c964fa64-2d45-46de-ae77-dd6f1030434f
