# Mano reprezentacinė svetainė

# Sveiki. Čia aprašysiu apie savo svetainės kūrimą.

- Sukuriu npx create-vite frontend:
   * cd frontend
   * npm install

- Pridedu github pages "gh-pages":
   * npm install gh-pages --save-dev

- Atsinaujinu package.json
   * pridedu homepage "homepage": "https://ZigmasP.github.io/website"

   * pridedu "scripts": {
                "predeploy": "npm run build",
                "deploy": "gh-pages -d build",
              }

- Paleidžiu npm run deploy
  * susikuria dist katalogas kuriame yra assets, index.html



