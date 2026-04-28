# Pannu Holistic Website

This is a React + Vite single-page website for Pannu Holistic Dental Myology.

## Local development

```bash
npm install
npm run dev
```

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

To pull live reviews in the Reviews section **without exposing a Google API key in the browser**, configure a server-side endpoint:

```bash
VITE_GOOGLE_REVIEWS_ENDPOINT=https://your-backend.example.com/google-reviews
```

The frontend accepts either:
- Google Places API v1 response shape, or
- Legacy Place Details shape (`result.reviews`), or
- A normalized payload containing `reviews`, `rating`, `userRatingCount`, and optional `googleMapsUri`.

Optional direct-browser fallback (not recommended because key is exposed client-side):

```bash
VITE_GOOGLE_MAPS_API_KEY=<google-maps-api-key>
```

The app is preconfigured with your Place ID (`ChIJUY5WJ9qDhYARJs7fpxLgji4`), so `VITE_GOOGLE_PLACE_ID` is optional unless you want to override it.

If no Google review config is set, the site automatically falls back to built-in testimonial content.
