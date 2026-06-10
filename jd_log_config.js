/*
 * JD logConfig cleaner for Loon.
 * Source endpoint observed in capture:
 * https://api.m.jd.com/client.action?functionId=logConfig
 */

const rawBody = $response.body || "";

try {
  const body = JSON.parse(rawBody);
  if (body && body.data) {
    body.data.enable = "0";
    if (body.data.logConfig) {
      body.data.logConfig.level = 0;
      body.data.logConfig.maxQueueSize = 0;
      body.data.logConfig.reportUrl = "";
    }
  }
  $done({ body: JSON.stringify(body) });
} catch (error) {
  $done({ body: rawBody });
}
