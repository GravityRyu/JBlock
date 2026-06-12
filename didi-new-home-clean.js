/*
 * DiDi new homepage cleanup for Loon.
 * Scope: only /homepage/v1/other/fast, only the new extra homepage modules.
 */

const body = $response && $response.body;

function removeNewHomeExtras(payload) {
  if (!payload || typeof payload !== "object") return payload;

  const data = payload.data;
  if (!data || typeof data !== "object") return payload;

  // Top shortcuts shown under the destination box:
  // AI call, booking, call for others, airport pickup/dropoff.
  if (data.disorder_cards && typeof data.disorder_cards === "object") {
    delete data.disorder_cards.scene_list_card;
  }

  // New lower feed cards:
  // travel inspiration, car rental, chartered car, activity banner.
  if (data.order_cards && typeof data.order_cards === "object") {
    delete data.order_cards.widget_card;
  }

  return payload;
}

try {
  const json = JSON.parse(body || "{}");
  $done({ body: JSON.stringify(removeNewHomeExtras(json)) });
} catch (error) {
  $done({ body });
}
