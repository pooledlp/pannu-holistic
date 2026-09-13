# Pannu Holistic website

A connected, prerendered React website for pannuholistic.com. The original homepage, hero video, transformation images and captions, biography, products, and selected testimonials remain. Dedicated care, visit, review, patient-story and guide pages have complete HTML, unique metadata, canonical URLs, structured data, a sitemap and RSS.

## Development and checks

Use Node 24 and pnpm 11.19.0. Run pnpm install --frozen-lockfile, pnpm build, pnpm check, and pnpm test. Run pnpm preview for the finished site on port 4174. BUILD_DATE=YYYY-MM-DD overrides the publishing date for testing. Do not commit secrets or build output.

## Publication

GitHub Pages must use GitHub Actions. The deploy workflow checks pull requests and publishes main after successful checks. It also rebuilds every Monday at 17:17 UTC to release date-scheduled, approved articles. The first three prepared guides are general appointment preparation, with two queued for September 21 and 28, 2026. The queue is finite; new material requires the editorial connection below or manually authored content.

## Weekly article research

No new OpenAI account is needed. Add an existing API key privately to this repository's Actions secret named OPENAI_API_KEY (never a VITE_ variable). A key in another repository is not automatically available here. The draft is saved in a weekly branch and the run summary. If this repository already allows Actions to create pull requests, a draft pull request is also opened; otherwise open one from the saved branch when ready to review. No permission setting change is required.

Every Monday at 17:47 UTC, the editorial workflow reserves one drafting attempt for the week, researches primary health sources, validates the draft and saves it for clinical review. It makes at most two OpenAI requests per attempt and never publishes an unreviewed generated article. A failed attempt leaves its reservation to prevent repeated charges. Inspect logs before intentionally deleting a reservation branch to retry.

A qualified clinical reviewer must read the complete draft and original sources, correct claims and citations, and supply their actual name and review date in reviewedBy and reviewedOn. Set status to approved and publishOn to the intended ISO date, then merge after checks. This is a human review step, not an AI assertion of review. Future articles appear on the next scheduled build on or after their date. Draft and future text is excluded from rendered pages, sitemap and RSS; repository files remain public.

The workflow is installed but cannot generate articles until this repository has its own secret. Do not describe generation as activated until a real run succeeds.

## Reviews and social

No aggregator account, API key or paid widget is required. Existing selected testimonials are retained with source attribution. Google and Yelp buttons lead to current reviews on the original platforms; the on-site cards do not automatically refresh. No combined live feed is claimed. Instagram and Facebook are profile links only. Update selected testimonials manually only with accurate attribution and permission where required. Avoid copying platform pages or manufacturing ratings.

## Contact and privacy

Forms use the existing FormSubmit endpoint for info@pannuholistic.com. VITE_CONTACT_ENDPOINT can override it at build time. Confirm delivery with the office; local checks do not send test emails. Requests are not confirmed bookings. Keep sensitive medical information out of the general inquiry form.

## Search and rollback

Sitemap: https://pannuholistic.com/sitemap.xml. RSS: https://pannuholistic.com/resources/feed.xml. Search Console ownership/submission is separate and is not automatically configured by this repository. No ranking guarantee or fabricated review-rich-result markup is included. Revert the redesign commit on main and rerun deployment to restore the previous version; leave public/CNAME and original media intact.
