# Note de refonte — Les Tables de la Fontaine

## Pourquoi l'ancien site perdait des clients

1. **Le bouton « Réservation » était mort** (`href="#"`) — l'action n°1 d'un
   restaurant ne menait nulle part. Le nouveau site a UN chemin de conversion
   clair : appeler (`tel:`), présent dans le header, le hero, le bandeau orange
   et le pied de page.
2. **Aucune carte consultable** — la page « Nos menus » était une ancre vide,
   sans un seul plat. La nouvelle section « La carte du moment » est éditable
   en 2 clics dans `/admin`, pensée pour le renouvellement mensuel (concept
   3-3-3 mis en avant).
3. **WordPress + Elementor + jQuery** — lourd, lent, LCP dégradé. Remplacé par
   Next.js statique : ~115 kB de JS au premier chargement, images optimisées
   (`next/image`), polices self-hostées.
4. **Contenu quasi vide** (« À propos » sans texte, pas de schema.org) —
   le nouveau site embarque JSON-LD `Restaurant` (NAP + horaires), metadata
   OG, sitemap et robots pilotés par le contenu Tina.
5. **L'identité de la marque était absente** — le logo ludique orange/marine
   n'existait nulle part dans le design. La direction **Décalé / Ludique** en
   découle entièrement : crème + bleu nuit + orange du logo, sauge des tables
   de la terrasse, stickers rotatifs, polaroïds inclinés, squiggle sous le mot
   accentué, motion à rebond.

## Ce qui a été livré

- **Un seul repo Next.js 15 + TinaCMS** (Git = source de vérité, médias
  repo-based dans `public/uploads`).
- **8 sections composables** : Héro, Carte & Menus, Galerie, Avis, Instagram,
  Réservation (bandeau), Carte & Accès (Google Maps + horaires), Contact
  (formulaire fixe + route API prête pour Resend).
- **Édition visuelle complète en français** : clic-sur-la-page
  (`data-tina-field` partout), aperçu temps réel (`useTina`), champs bornés
  (aucun HTML/CSS libre), `alt` obligatoire, valeurs par défaut et validations.
- **Réglages d'apparence client** : couleur d'accent (pipette), police des
  titres, tailles texte/titres, arrondi des formes — plus une surcharge
  d'apparence du titre par section.
- **Accessibilité & perf** : responsive 375→1920 vérifié, lien d'évitement,
  focus visibles, `prefers-reduced-motion` respecté, scrim de lisibilité sur
  le hero, build prod vert.
- Photos réelles du restaurant réutilisées (terrasse, façade, comptoir,
  assiette) + logo en favicon/apple-icon.

## Contenu à valider par le client

- Les **3 avis** de la section « Ils ont aimé » sont des exemples à remplacer
  par de vrais avis Google (4,8★ / 693 avis sur la fiche — piochez dedans !).
- La section « La carte du moment » reprend le **vrai menu de juillet**
  (photo de la carte cliquable + galeries de photos par catégorie, prix 14/25/9 €,
  menu complet 45 €/pers) — à mettre à jour chaque mois dans `/admin`.
- L'email `contact@lestablesdelafontainetoulon.fr` et les horaires ont été
  repris de l'ancien site — à confirmer.

## Prochaines étapes

1. Pousser le repo sur GitHub, créer le projet TinaCloud, déployer sur Vercel
   (voir README — variables d'env avant le build).
2. Activer la protection par mot de passe Vercel pour la préview client.
3. Après validation : brancher `RESEND_API_KEY`, inviter le client sur
   TinaCloud, remettre l'accès `/admin` avec un mini-guide.
