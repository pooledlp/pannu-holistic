# Weekly patient-guide recovery

The workflow still produces at most one saved guide per UTC Monday week, on an
editorial branch, requiring clinical review. No publication code, prompts,
source allowlist, model, or clinical validation rules were changed.

## API behavior

Two logical requests (research then drafting), each with at most three HTTP
attempts. Only 429 and 500/502/503/504 retry. Backoff is exponential with jitter;
Retry-After seconds and HTTP dates are respected. A server wait over 60 seconds
stops instead of retrying early. Each HTTP attempt has a 90-second timeout;
transport failures are not automatically retried because delivery is ambiguous.
Quota/billing errors and other 4xx errors stop immediately. Incomplete/refused,
malformed, or clinically invalid output never becomes an article.

Logs include HTTP status, allowlisted-format error code/type, request ID, attempt
number and delay. They exclude raw error messages, payloads and credentials.
The workflow retains diagnostics as an artifact for 14 days, outside the site.
Generation metadata distinguishes logical calls from HTTP attempts.

## Weekly reservation

The serialized workflow reserves its branch before paid work. An ordinary rerun
of the scheduled event does not bypass the reservation. A manual workflow dispatch
may recover a reservation-only branch once, including legacy failed reservations.
It must contain exactly the recognized original marker and no other changes from
its merge base. Drafts, editorial edits, unrecognized markers and exhausted
recovery markers block generation. Remote inspection failures stop the workflow.
Recovery merges the reservation into the latest main without resetting or force
pushing, retaining current website changes. The generation date is pinned to the
reservation date even if execution crosses midnight. A second recovery is blocked.
A saved draft on main also blocks work if its editorial branch was deleted.

After a successful draft, review the saved branch/artifact. A PR-creation failure
does not authorize another generation. Open the existing draft for clinical review.
Do not delete reservation markers to bypass the budget.

## Investigation (2026-11-09 Pacific)

- November 9 run 42731469162 and November 2 run 41549872143: HTTP 429.
  No error body, type, code or request ID was retained, so the historical subtype
  cannot be determined from available logs. No draft artifacts were produced.
- October 26 run 40407965717 and October 19 run 39329858520: Invalid article
  metadata. API generation reached local validation; keep this rejection intact.
- Main baseline e5c779b7eda20e22da5574517e3ff8c64304761f includes the completed
  book showcase and cover-straightening update. Website files are untouched.

Before a production recovery, the account owner should check credits and limits
for the API project behind the repository's OPENAI_API_KEY. The key was present;
its validity, current model access and account balance cannot be proven from a
bare historical 429. Do not change billing or rotate keys merely on that evidence.
If available, account-side request logs for the failed times can resolve the
subtype without a paid probe. Future failures will carry safe diagnostic codes.

Reference: https://developers.openai.com/api/docs/guides/error-codes

Validation: pnpm install --frozen-lockfile; pnpm test; pnpm build; pnpm check;
git diff --check. Tests use mocked HTTP and temporary local Git remotes only.
No production API requests, workflow dispatches, merges or deployments are needed.
