****
    Was bedeuten folgende Befehle:
        npm run version:build -> Erhöht automatisch die Version in der package.json Datei
                                    z.B von 1.0.0 auf 1.0.1

                            npm version patch	z. B. 1.0.0 → 1.0.1
                            npm version minor	z. B. 1.0.0 → 1.1.0
                            npm version major	z. B. 1.0.0 → 2.0.0

                            -> macht automaisch einen GIT commit mit dieser Version
                                erstellt auch automatisch ein GIT - Tag (v...)
        npm run build -> legt das fertige Projekt im dist Ordner ab.



🔹 1. Versionskontrolle mit Git

Wenn du’s noch nicht hast:

git init
git add .
git commit -m "Initial version 1.0"


Dann bei GitHub oder GitLab ein Repo anlegen und verbinden:

git remote add origin https://github.com/deinname/deinprojekt.git
git push -u origin main

➕ Neue Version erstellen:

Mach deine Änderungen (Code, Design, Features)

Committe sie:

git add .
git commit -m "Neue Funktion: Dark Mode hinzugefügt"


Erstelle eine Version (Tag):

git tag v1.1
git push origin v1.1




<!-- AUFGABEN -->


Feedback button -> alles andere in den Hintergrund setzen (timer, checkbox, usw)