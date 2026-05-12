const GOOGLE_SOURCE_URL = "https://www.google.com/search?q=Pannu+Holistic+Dental+Myology+Reviews";
const YELP_SOURCE_URL = "https://www.yelp.com/biz/pannu-holistic-dental-myology-point-richmond";

const JUNK_PATTERNS = [
  /function\s*\(/i,
  /window\.|document\.|google\.|webpack|script|stylesheet|var\s+/i,
  /\{.*\}|\.y-css-|\.responsive|@media/i,
  /^(reviews?|photos?|friends?|report review|review options|react|share)$/i,
];

export const fallbackReviews = [
  {
    reviewerName: "Yvonne Marroquin",
    review:
      "We had an amazing experience! The service was above and beyond and my 5 year old is already looking forward to visiting again. I really appreciate the education we received and all of the details that made my daughter feel so comfortable, from playing Frozen songs to gifting her a tiara. I highly recommend!",
    rating: 5,
    date: "2 months ago",
    source: "Google",
    sourceUrl: GOOGLE_SOURCE_URL,
  },
  {
    reviewerName: "Erica Garcia",
    review:
      "Being under the care and guidance of Taren is something I am so, so grateful for! I was done with bouncing around different dental offices and not feeling I was truly receiving quality care. Finding Taren was an answered prayer, truly.",
    rating: 5,
    date: "8 months ago",
    source: "Google",
    sourceUrl: GOOGLE_SOURCE_URL,
  },
  {
    reviewerName: "Lorena Castillo",
    review:
      "Wonderful treatments for me and my young daughter. Dr. Pannu truly has a passion for our teeth's health and longevity. Because of her services I have taken a new approach for my teeth and gum health.",
    rating: 5,
    date: "9 months ago",
    source: "Google",
    sourceUrl: GOOGLE_SOURCE_URL,
  },
  {
    reviewerName: "Catherine Munoz",
    review:
      "Taren Pannu's office was so inviting and clean. She has a very calming and gentle disposition. She explained everything to me while she was doing and was very thorough. My teeth felt great when I left.",
    rating: 5,
    date: "Sep 3, 2024",
    source: "Yelp",
    sourceUrl: YELP_SOURCE_URL,
  },
];

function cleanText(value = "") {
  return value
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function isValidReviewText(text) {
  const cleaned = cleanText(text);
  if (cleaned.length < 35 || cleaned.length > 1800) return false;
  if (!/[.!?]/.test(cleaned)) return false;
  if (JUNK_PATTERNS.some((pattern) => pattern.test(cleaned))) return false;
  const letterCount = (cleaned.match(/[a-z]/gi) || []).length;
  return letterCount / Math.max(cleaned.length, 1) > 0.45;
}

function parseRating(text) {
  const match = cleanText(text).match(/(?:Rated\s*)?(\d(?:\.\d)?)\s*(?:out of|star|stars|\/)?\s*5?/i);
  if (!match) return 5;
  const rating = Number(match[1]);
  return Number.isFinite(rating) ? Math.max(1, Math.min(5, Math.round(rating))) : 5;
}

function normalizeReview(review) {
  const normalized = {
    reviewerName: cleanText(review.reviewerName) || "Pannu Holistic patient",
    review: cleanText(review.review),
    rating: review.rating ? parseRating(String(review.rating)) : 5,
    date: cleanText(review.date),
    source: review.source,
    sourceUrl: review.sourceUrl,
  };

  return isValidReviewText(normalized.review) ? normalized : null;
}

function dedupeReviews(reviews) {
  const seen = new Set();
  return reviews.filter((review) => {
    const key = `${review.source}|${review.reviewerName.toLowerCase()}|${review.review.toLowerCase().slice(0, 120)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function parseJsonLdReviews(doc, source, sourceUrl) {
  const reviews = [];
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    try {
      const data = JSON.parse(script.textContent || "null");
      const stack = Array.isArray(data) ? [...data] : [data];
      while (stack.length) {
        const item = stack.pop();
        if (!item || typeof item !== "object") continue;
        if (item["@type"] === "Review" || item.reviewBody) {
          reviews.push({
            reviewerName: item.author?.name || item.author || "",
            review: item.reviewBody || item.description || "",
            rating: item.reviewRating?.ratingValue || item.ratingValue || 5,
            date: item.datePublished || "",
            source,
            sourceUrl,
          });
        }
        Object.values(item).forEach((value) => {
          if (Array.isArray(value)) stack.push(...value);
          else if (value && typeof value === "object") stack.push(value);
        });
      }
    } catch {
      // Ignore malformed saved-page JSON.
    }
  });
  return reviews;
}

export function parseGoogleReviews(doc) {
  const reviews = [...parseJsonLdReviews(doc, "Google", GOOGLE_SOURCE_URL)];

  doc.querySelectorAll('[jscontroller="KUoFuf"], .gws-localreviews__google-review').forEach((card) => {
    const name = card.querySelector(".Vpc5Fe")?.textContent || card.querySelector('[aria-label*="Review by"]')?.getAttribute("aria-label")?.replace(/Review by/i, "");
    const review = card.querySelector(".OA1nbd")?.textContent || card.querySelector(".Jtu6Td")?.textContent;
    const ratingLabel = card.querySelector('[aria-label*="Rated"]')?.getAttribute("aria-label") || "5";
    const date = card.querySelector(".y3Ibjb")?.textContent || card.querySelector(".dehysf")?.textContent || "";
    const sourceUrl = card.querySelector("a.yC3ZMb")?.href || GOOGLE_SOURCE_URL;
    reviews.push({ reviewerName: name, review, rating: parseRating(ratingLabel), date, source: "Google", sourceUrl });
  });

  return dedupeReviews(reviews.map(normalizeReview).filter(Boolean));
}

export function parseYelpReviews(doc) {
  const reviews = [...parseJsonLdReviews(doc, "Yelp", YELP_SOURCE_URL)];

  doc.querySelectorAll('li[class*="y-css"], [role="region"][aria-label]').forEach((card) => {
    const reviewNode = card.querySelector('p[class*="y-css"]:not([class*="1vi7y4e"])');
    const review = reviewNode?.textContent || "";
    if (!isValidReviewText(review)) return;

    const name = card.querySelector(".user-passport-info a")?.textContent || card.querySelector('[role="region"][aria-label]')?.getAttribute("aria-label") || card.getAttribute("aria-label") || "";
    const date = card.querySelector(".y-css-1vi7y4e")?.textContent || "";
    const sourceUrl = card.querySelector('a[href*="user_details"]')?.href || YELP_SOURCE_URL;
    reviews.push({ reviewerName: name, review, rating: 5, date, source: "Yelp", sourceUrl });
  });

  return dedupeReviews(reviews.map(normalizeReview).filter(Boolean));
}

export function parseReviewsFromHtml(html, source) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return source === "Yelp" ? parseYelpReviews(doc) : parseGoogleReviews(doc);
}

export function mergeReviews(reviewGroups) {
  return dedupeReviews(reviewGroups.flat().map(normalizeReview).filter(Boolean));
}
