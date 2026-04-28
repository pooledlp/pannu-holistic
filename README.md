# Pannu Holistic Website

This is a React + Vite single-page website for Pannu Holistic Dental Myology.

## Local development

```bash
npm install
npm run dev
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

Optional direct-browser fallback (not recommended because key is exposed client-side):

```bash
VITE_GOOGLE_PLACE_ID=<google-place-id>
VITE_GOOGLE_MAPS_API_KEY=<google-maps-api-key>
```

If no Google review config is set, the site automatically falls back to built-in testimonial content.
