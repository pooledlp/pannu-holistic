import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fallbackReviews, mergeReviews, parseReviewsFromHtml } from "../utils/parseReviews";

const PREVIEW_LENGTH = 210;

function StarRating({ rating = 5 }) {
  const count = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
  return (
    <div className="review-rating" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true" className={index < count ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, collapseKey }) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = review.review.length > PREVIEW_LENGTH;
  const copy = !canExpand || expanded ? review.review : `${review.review.slice(0, PREVIEW_LENGTH).trim()}...`;

  useEffect(() => {
    setExpanded(false);
  }, [collapseKey]);

  return (
    <article className="review-card ticker-review-card" aria-label={`${review.source} review by ${review.reviewerName}`}>
      <div className="review-card-topline">
        <StarRating rating={review.rating} />
        <span className={`review-source-badge review-source-${review.source.toLowerCase()}`}>{review.source}</span>
      </div>
      <p className="review-copy">{copy}</p>
      {canExpand ? (
        <button
          type="button"
          className="review-read-more"
          onClick={(event) => {
            event.stopPropagation();
            setExpanded((current) => !current);
          }}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}
      <div className="review-card-footer">
        <div className="review-name">{review.reviewerName}</div>
        {review.date ? <div className="review-when">{review.date}</div> : null}
      </div>
    </article>
  );
}

export default function ReviewTicker() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [collapseKey, setCollapseKey] = useState(0);
  const shellRef = useRef(null);
  const scrollResetRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const [googleHtml, yelpHtml] = await Promise.all([
          fetch("/google.html").then((response) => (response.ok ? response.text() : "")),
          fetch("/yelp.html").then((response) => (response.ok ? response.text() : "")),
        ]);
        const parsed = mergeReviews([
          googleHtml ? parseReviewsFromHtml(googleHtml, "Google") : [],
          yelpHtml ? parseReviewsFromHtml(yelpHtml, "Yelp") : [],
        ]);

        if (isMounted && parsed.length > 0) {
          setReviews(parsed);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("Unable to parse local saved reviews. Using fallback reviews.", error);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function collapseOpenReviews(event) {
      if (shellRef.current?.contains(event.target)) {
        return;
      }

      setCollapseKey((current) => current + 1);
    }

    document.addEventListener("pointerdown", collapseOpenReviews);

    return () => {
      document.removeEventListener("pointerdown", collapseOpenReviews);
    };
  }, []);

  const tickerReviews = useMemo(() => [...reviews, ...reviews], [reviews]);
  const duration = Math.max(45, reviews.length * 7);

  const handleTickerScroll = useCallback((event) => {
    const ticker = event.currentTarget;

    if (scrollResetRef.current || window.matchMedia("(min-width: 721px)").matches) {
      return;
    }

    const reviewSetWidth = ticker.scrollWidth / 2;

    if (reviewSetWidth <= 0 || ticker.scrollLeft < reviewSetWidth) {
      return;
    }

    scrollResetRef.current = true;
    ticker.scrollLeft -= reviewSetWidth;
    requestAnimationFrame(() => {
      scrollResetRef.current = false;
    });
  }, []);

  return (
    <div ref={shellRef} className="reviews-ticker-shell reveal" style={{ "--reviews-duration": `${duration}s` }}>
      <div className="reviews-ticker" aria-label="Patient reviews carousel" onScroll={handleTickerScroll}>
        <div className="reviews-ticker-track">
          {tickerReviews.map((review, index) => (
            <ReviewCard
              key={`${review.source}-${review.reviewerName}-${index}`}
              review={review}
              collapseKey={collapseKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
