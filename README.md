# Pannu Holistic Website

This is a React + Vite single-page website for Pannu Holistic Dental Myology.

## Local development

```bash
npm install
npm run dev
```

The Vite base path is set to a relative value (`./`) so assets resolve when deployed at root domains, custom domains, or subpaths.

### Troubleshooting

- If you see `sh: 1: vite: not found`, run `npm install` first (or use `npm run build`, which now falls back to `npx vite build`).
- If npm warns about `Unknown env config "http-proxy"`, clear that stale setting before install:

```bash
npm config delete http-proxy
npm config delete https-proxy
```

## Contact form configuration

The contact form submits to Formspree. Configure the endpoint using an environment variable:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<your-form-id>
```

You can place this in a local `.env` file for development.

## Google reviews configuration

The Reviews section now uses an embedded Google Maps reviews view (no API key required).

```bash
VITE_GOOGLE_PLACE_ID=ChIJUY5WJ9qDhYARJs7fpxLgji4
```

If `VITE_GOOGLE_PLACE_ID` is not set, the app defaults to `ChIJUY5WJ9qDhYARJs7fpxLgji4`.
