#!/bin/bash
# Push Aerofly content to DA (Document Authoring) storage
# Usage: ./push-to-da.sh <DA_TOKEN>
#
# Get your token:
#   1. Go to https://da.live
#   2. Sign in
#   3. Open browser DevTools → Network tab
#   4. Navigate to your site files
#   5. Find any request to admin.da.live → copy the Authorization: Bearer <token>

set -euo pipefail

ORG="anfibiacreativa"
REPO="aem-aerofly-demo"
API="https://admin.da.live/source/${ORG}/${REPO}"

TOKEN="${1:-}"
if [ -z "$TOKEN" ]; then
  echo "Usage: $0 <DA_BEARER_TOKEN>"
  echo ""
  echo "Get your token from DA:"
  echo "  1. Sign in at https://da.live"
  echo "  2. Open DevTools > Network > find a request to admin.da.live"
  echo "  3. Copy the Bearer token from the Authorization header"
  exit 1
fi

# Content HTML files to push (path -> DA path mapping)
# DA expects: <body><header/><main>...</main><footer/></body>
declare -a PAGES=(
  "nav.html"
  "footer.html"
  "index.html"
  "buy-aerofly/index.html"
  "buy-aerofly-a/index.html"
  "buy-aerofly-a-new/index.html"
  "buy-aerofly-b/index.html"
  "buy-aerofly-c/index.html"
  "about/index.html"
  "careers/index.html"
  "cart/index.html"
  "cart/airpulse-max/index.html"
  "collection/index.html"
  "help/index.html"
  "men/index.html"
  "newsletter/index.html"
  "products/airpulse-max.html"
  "returns/index.html"
  "running/index.html"
  "sale/index.html"
  "shop/index.html"
  "size-guide/index.html"
  "stores/index.html"
  "sustainability/index.html"
  "training/index.html"
  "women/index.html"
)

TOTAL=${#PAGES[@]}
SUCCESS=0
FAIL=0

echo "=========================================="
echo " Pushing ${TOTAL} pages to DA"
echo " Org: ${ORG} / Repo: ${REPO}"
echo "=========================================="
echo ""

for page in "${PAGES[@]}"; do
  FILE_PATH="$page"

  if [ ! -f "$FILE_PATH" ]; then
    echo "SKIP: $FILE_PATH (not found)"
    ((FAIL++))
    continue
  fi

  # Read the body-only HTML content from disk
  CONTENT=$(cat "$FILE_PATH")

  # Wrap in <body> if not already wrapped
  if [[ "$CONTENT" != *"<body>"* ]]; then
    CONTENT="<body>
${CONTENT}
</body>"
  fi

  # Create a temp file with the wrapped content
  TMPFILE=$(mktemp /tmp/da-upload-XXXXXX.html)
  echo "$CONTENT" > "$TMPFILE"

  # Create parent folders if needed (DA needs them)
  DIR_PATH=$(dirname "$page")
  if [ "$DIR_PATH" != "." ]; then
    # Ensure folder exists by creating it (POST with no data)
    curl -s -o /dev/null -w "" \
      -X POST "${API}/${DIR_PATH}" \
      -H "Authorization: Bearer ${TOKEN}" \
      2>/dev/null || true
  fi

  # Upload the content via POST multipart/form-data (correct DA API)
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "${API}/${page}" \
    -H "Authorization: Bearer ${TOKEN}" \
    -F "data=@${TMPFILE};type=text/html")

  rm -f "$TMPFILE"

  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "204" ]; then
    echo "  OK: ${page} (${HTTP_CODE})"
    ((SUCCESS++))
  else
    echo "FAIL: ${page} (HTTP ${HTTP_CODE})"
    ((FAIL++))
  fi
done

echo ""
echo "=========================================="
echo " Done: ${SUCCESS}/${TOTAL} succeeded, ${FAIL} failed"
echo "=========================================="

if [ "$SUCCESS" -gt 0 ]; then
  echo ""
  echo "Preview: https://main--${REPO}--${ORG}.aem.page/"
  echo "DA edit: https://da.live/#/${ORG}/${REPO}"
fi
