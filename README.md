# Les Tables de la Fontaine — lestablesdelafontainetoulon.fr

Refonte du site du restaurant **Les Tables de la Fontaine** (Place Gustave
Lambert, Toulon). Un seul repo **Next.js 15 (App Router) + TinaCMS** : tout le
contenu est éditable visuellement par le client sur **`/admin`**
(clic-sur-la-page, aperçu temps réel), versionné en Git.

- **Direction artistique :** Décalé / Ludique (HEPTERACT_WEBSKIN_1) — dérivée du
  logo de la marque (orange `#e8590c`, bleu nuit `#212a6b`, crème, sauge).
  Polices : Bricolage Grotesque (titres) · Plus Jakarta Sans (corps) ·
  Fraunces italique (accents) — self-hostées via `next/font`.
- **Design tokens :** contrat Siteforge dans [styles.css](styles.css)
  (`[data-style="decale"]`) — aucun littéral visuel dans les composants.

## Démarrer en local

```bash
cp .env.example .env        # renseigner les identifiants TinaCloud
npm install
npx tinacms dev -c "next dev"   # → http://localhost:3000 · éditeur sur /admin
```

> Ports par défaut : Next 3000, GraphQL 4001, datalayer 9000. Si un autre
> projet Tina tourne déjà :
> `npx tinacms dev --datalayer-port 9100 -p 4102 -c "next dev -p 3010"`.

## Build de production

```bash
npm run build     # tinacms build && next build (c'est ce que Vercel exécute)
```

Build local SANS TinaCloud (⚠️ `NODE_ENV=production` obligatoire, sinon les
pages /404–/500 cassent — gotcha connu) :

```bash
NODE_ENV=production npx tinacms build --skip-cloud-checks --local -c "next build"
```

## Déploiement Vercel

1. Créer le projet **TinaCloud** (app.tina.io) — un projet isolé pour ce client —
   et le brancher sur ce repo / la branche `main`.
2. Dans Vercel, poser les variables **avant** le premier build :
   `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`, `NEXT_PUBLIC_TINA_BRANCH`,
   `NEXT_PUBLIC_SITE_URL` (+ `RESEND_API_KEY` pour le formulaire de contact).
3. Build command : `tinacms build && next build` (défaut du `package.json`).
4. Activer la **protection par mot de passe** Vercel sur la préview client.

## Édition client (handoff)

- Inviter le client comme utilisateur sur **son** projet TinaCloud.
- Lui donner l'URL **`/admin`** : il clique sur un élément de la page et
  l'édite dans la barre latérale (tout est en français, bornes et validations
  partout, `alt` obligatoire sur chaque image).
- Réglages globaux (logo, navigation, coordonnées, horaires, couleur d'accent,
  polices et tailles) : panneau **« Réglages du site »**.
- La page d'accueil se compose en **sections** (Héro, Carte & Menus, Galerie,
  Avis, Instagram, Réservation, Carte & Accès, Contact) — ajout, suppression et
  réordonnancement par glisser-déposer.

## Structure

```
tina/config.tsx            schéma (collections page + global)
tina/fields.ts             imageField (alt requis) + linkField
tina/fields/…              ColorPicker, apparence des titres
components/blocks/<Bloc>/  template.ts (champs Tina) + Component.tsx (rendu)
components/RenderBlocks.tsx  switch sur block.__typename
content/pages/home.mdx     contenu de la page d'accueil
content/global/index.json  header, footer, coordonnées, apparence, SEO
public/uploads/            médias (repo-based, versionnés avec le contenu)
styles.css                 design tokens + CSS des blocks
```

## Formulaire de contact

`components/ContactForm.tsx` poste vers `app/api/contact/route.ts`. Renseigner
`RESEND_API_KEY` (resend.com) pour l'envoi réel des emails ; sans clé, les
messages sont simplement journalisés (mode préview).
