# AGENTS.md — Siteforge (sites clients TinaCMS)

Guide pour toute génération de code IA sur un **site client Siteforge**. À lire en
premier, à respecter à la lettre.

> **⚠️ LECTURE N°1 — `SITEFORGE-GEN-DIRECTIVES.md`.** C'est le playbook de
> génération **validé de bout en bout** (build opticien Edgard : TinaCMS + TinaCloud
> + Git, déploiement Vercel). Il fixe : le starter exact, le **contrat de design
> tokens**, les **contrôles Tina côté client** (Appearance global + apparence par
> block, ColorPicker, échelles), le catalogue de blocks, les **3 kits de tokens**
> (Brutaliste/Luxe/Décalé), les animations de scroll, le déploiement, et surtout les
> **pièges connus (§10)** à éviter d'emblée. **Il prime sur ce fichier et sur les
> autres standards en cas de conflit** (il reflète un site réellement livré).
> Charge aussi le skill **`hepteract-webskin-1`** pour l'art-direction.

Procédure conceptuelle : `SITEFORGE_BRIEF.md` ; recettes prêtes à coller :
`TINA-BLOCKS.md` et `TINA-STYLE-KIT.md`.

> ⚠️ Ce fichier décrit le standard des **sites livrés au client**. L'app Siteforge
> elle-même (ce dépôt : scraper → audit → proposal → build) est un outil interne
> distinct et ne suit pas ces règles.

---

## Objectif

Livrer un **site Next.js (App Router) premium**, éditable par un **client non
technique** via l'édition visuelle « clic sur la page » de **TinaCMS**, avec le
**minimum de bugs** et l'intégration Tina **la plus fluide possible**.

## Stack

- **Next.js 15 (App Router)** · React 19 · TypeScript.
- **TinaCMS** — backend **TinaCloud (managé)**. Contenu en **Markdown/MDX/JSON**
  dans `content/` (Git = source de vérité). Client GraphQL + types **auto-générés**
  (`tina/__generated__/`).
- **Médias repo-based** (`public/uploads`, `media.tina`).
- **Styles** : 3 DESIGN SYSTEMS Siteforge (Brutaliste / Luxe / Décalé) pilotés par
  **variables CSS** (`data-style` sur `<html>`), polices self-hostées (`next/font`).
- Déploiement **Vercel** ; éditeur sur **`/admin`**.

## Règles Tina — NON NÉGOCIABLES

1. **Schéma d'abord.** Définir le modèle dans `tina/config.ts` (collections +
   templates) AVANT toute page ou composant.
2. **`data-tina-field` partout.** Chaque élément éditable porte
   `data-tina-field={tinaField(data, 'champ')}` (ou `tinaField(item)` pour un item
   de liste / block). **Oubli = bug n°1.** Vérifier block par block.
3. **`useTina` côté client.** La page d'édition est un Client Component qui appelle
   `useTina({ query, variables, data })` et **rend `data` retourné, jamais
   `props.data`** (sinon pas de MAJ temps réel).
4. **Pattern App Router.** Server Component fetch au build (`client.queries.*` +
   `generateStaticParams`) → passe `{ query, variables, data }` au Client Component.
   Gérer la revalidation (`export const revalidate = N`) pour éviter le cache
   agressif de Vercel.
5. **Types générés, pas écrits.** Dériver les interfaces de la réponse de requête
   Tina (`tina/__generated__/types`). Ne jamais taper les props à la main.
6. **Blocks = templates.** Champ `object` `list: true` + `templates: [...]` ;
   rendu via `switch (block.__typename)` (`PageBlocksHero`…).
7. **Globals = `ui: { global: true }`** (header, footer, settings).
8. **Ne jamais inventer Tina.** En cas de doute → `tina.io/docs`.

## Éditabilité client — OBLIGATOIRE

- Libellés `label` + aides `description` **en français** sur chaque champ.
- `required: true` + valeurs par défaut (`ui.defaultItem`) + validations
  (`ui.validate`) → jamais d'état cassé.
- **`alt` obligatoire** sur chaque image → modéliser l'image en objet
  `{ src: image, alt: string(required) }` (le champ `image` Tina ne stocke qu'un
  chemin).
- **Aucun HTML/CSS libre** pour le client : variantes via `string` + `options`.
- Le client ne peut pas casser la mise en page : n'exposer que les variations
  prévues.

## Style (DESIGN SYSTEM)

- Le style choisi (reFORGE : Brutaliste / Luxe / Décalé) devient `data-style` sur
  `<html>`. Les blocks consomment **uniquement** les variables CSS
  (`var(--accent)`, `var(--font-display)`…). **Aucune couleur/police codée en dur.**
- Voir `TINA-STYLE-KIT.md` pour les 3 `tokens.css` et les utilitaires.

## Méthode de travail (doc Tina « Vibe Coding »)

- **Construire par petits morceaux vérifiables.** Un block à la fois ; lancer le
  dev server (`tinacms dev -c "next dev"`) et **valider après chaque block**
  (rendu + édition `/admin` + `data-tina-field` actif) avant de passer au suivant.
- **Commiter avant un gros changement IA** (point de sauvegarde).
- **Réinitialiser le contexte entre tâches distinctes** ; amorcer l'IA avec juste
  ce qu'il faut + ce fichier.
- **Signaler les points de contrôle** au lieu de tout générer d'un bloc.

## Commandes

```bash
# démarrage (jamais une page blanche) — starter validé
npx create-tina-app@latest <projet> -t tina-nextjs-starter -p npm --noTelemetry
npm install
npx tinacms dev -c "next dev"         # dev : Next + Tina, éditeur sur /admin

# build de prod (Vercel le fait seul) :
tinacms build && next build
# build LOCAL (piège §10.1 : NODE_ENV doit valoir production, sinon /404 casse) :
NODE_ENV=production npx tinacms build --skip-cloud-checks --local -c "next build"
```

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | id du projet TinaCloud |
| `TINA_TOKEN` | token (lecture) TinaCloud — requis au build |
| `NEXT_PUBLIC_TINA_BRANCH` | branche suivie (souvent `main`) |

## Définition de « terminé » (Definition of Done)

- Schéma `tina/config.ts` complet (pages + globals) ; types générés.
- 6 blocks en templates + composants, chacun avec `data-tina-field` sur tous les
  champs éditables, validé en édition live.
- Édition « clic sur la page » + aperçu temps réel fonctionnels.
- FR + required + defaults + validations partout ; `alt` requis sur chaque image.
- `build = tinacms build && next build` OK ; `/admin` sert l'éditeur.
- Responsive 375px+, WCAG AA, LCP < 2.5s, Lighthouse 90+.
- `.env.example` + README + ce `AGENTS.md` présents.
