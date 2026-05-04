# Pannu Holistic Website

This is a React + Vite single-page website for Pannu Holistic Dental Myology.

## Local development

```bash
npm install
npm run dev
```

The Vite base path is automatic:
- local/dev builds use `/`
- GitHub Actions deploy builds use `/pannu-holistic/`

### Troubleshooting

- If you see `sh: 1: vite: not found`, run `npm install` first (or use `npm run build`, which now falls back to `npx vite build`).
- If npm warns about `Unknown env config "http-proxy"`, clear that stale setting before install:

```bash
npm config delete http-proxy
npm config delete https-proxy
```

## Contact form configuration

The contact form submits to a free FormSubmit endpoint and sends to `info@pannuholistic.com` by default:

```bash
VITE_CONTACT_ENDPOINT=https://formsubmit.co/ajax/info@pannuholistic.com
```

If you prefer a different free SMTP/form relay provider, set `VITE_CONTACT_ENDPOINT` to that provider's POST URL in your local `.env` file.

## Google reviews configuration

The Reviews section now uses an embedded Google Maps reviews view (no API key required).

```bash
VITE_GOOGLE_PLACE_ID=ChIJUY5WJ9qDhYARJs7fpxLgji4
```

If `VITE_GOOGLE_PLACE_ID` is not set, the app defaults to `ChIJUY5WJ9qDhYARJs7fpxLgji4`.
