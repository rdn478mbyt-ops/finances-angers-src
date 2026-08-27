# Finances de la Ville d’Angers

Outil de travail pour élus d’opposition : lecture des comptes de la **Ville d’Angers** et de la **Boucle optique angevine (BOA)**. Pas une vitrine. Identité : rose nationale du Parti socialiste (mot-marque + poing-rose), zéro « Demain Angers ».

Production : [https://finances-angers.vercel.app](https://finances-angers.vercel.app)

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://127.0.0.1:43147](http://127.0.0.1:43147).

## Contenu

- Grille FNESR (26/08/2026) : épargne brute, masse salariale, capacité de désendettement, cessions, entretien, heures sup — **aujourd’hui** (CA 2025 / DM n°1), avec jauges à zones 15 % / 8 % / 5 %.
- Horizon (virements entre chapitres, plan par politiques publiques) : prochain budget, pas l’état des comptes 2025.
- Face-à-face fonctionnement | investissement (aplats `#00a870` / `#ba4e8e`), barres empilées Ville vs BOA et CA vs DM1, bandeau bas « chiffre à retenir » **dans le flux** (fin de page, pas `sticky` / pas d’overlay sur les cartes au scroll).
- Explorateur `/explorer` : chapitre → compte → ligne, sourcé du **compte de gestion** (03. Ville / BOA, états II-3 et II-4) et de la **maquette CA** (04.), pas des agrégats du dashboard. CG Ville : 77 p., ~458 n° de comptes, ~5 100 montants. Maquette CA Ville : 474 p., ~47 000 montants. Index gzip `public/explorer/index.json.gz` (reconstruit par `scripts/build-explorer.py`).
- Bandeau en tête : seul endroit où le calendrier de nomenclature est annoncé. CA 2025, DM n°1 et conseil du 27 mars 2026 ne sont pas présentés comme maquettes du prochain budget.
- Fonds documentaire : 46 PDF dans `public/pieces/` (noms de fichiers réels), recherche plein texte sur le **calque texte** (index gzip, 54 pièces / 1 112 pages). Les scans sans texte (PV 27 mars, conventions 29) sont nommés : aucun résultat n’est inventé. Libellé à l’écran pour le RBF : « Règlement budgétaire et financier » (fichier `fnancier` = nom réel de la pièce).
- Hors git / hors archive Hobby (100 Mo) : `33._Promesse.pdf` (52 Mo) et `34._Promesse_dachat.pdf` (43 Mo). Étiquette **Hors bundle · dépôt privé** — pas de bouton de téléchargement public, pas de lien Release anonyme, pas de 503 Hobby, pas de lien angers.fr. Les PDF restent dans le dépôt privé des pièces (Release pour l’équipe).

Chiffres du budget principal : rapport DEL-2026-164 + **04. Maquette compte administratif 2025**. BOA : maquette 04 BOA, p. 7.

## Déploiement

Projet Vercel existant `finances-angers` (`prj_CPz1QJ4cunDoJW1NsOfvqsXZyp00`, équipe `team_5ANMKibuMb0dYodT1gCjhA7h`). Lien dans `.vercel/project.json`. Production :

```bash
npx vercel --prod --yes
```

## Typographie

Charte : **Brown** (texte) et **Stinger Variable Fit** (titres, chiffre du bandeau). Fichiers auto-hébergés dans `src/fonts/`. Pas Plus Jakarta Sans, pas Syne.

## Nuancier

`#00a870` `#a8d3af` `#fbe216` `#ba4e8e` `#ef7a97` `#e84250`
