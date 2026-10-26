/* Prism JWT Inspector · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const subtle = () => (globalThis.crypto && globalThis.crypto.subtle) || require("crypto").webcrypto.subtle;
  const enc = new TextEncoder();
  function b64urlToBytes(s) {
    s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "=";
    const bin = atob(s); return Uint8Array.from(bin, (c) => c.charCodeAt(0));
  }
  function bytesToB64url(bytes) {
    let bin = ""; new Uint8Array(bytes).forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  const jsonToB64url = (o) => bytesToB64url(enc.encode(JSON.stringify(o)));
  const decodePart = (p) => JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
  function decode(token) {
    token = String(token).trim().replace(/^Bearer\s+/i, "");
    const parts = token.split(".");
    if (parts.length !== 3) return { ok: false, error: `A JWT has 3 parts separated by dots; found ${parts.length}` };
    try {
      return { ok: true, header: decodePart(parts[0]), payload: decodePart(parts[1]), signature: parts[2], parts };
    } catch (e) { return { ok: false, error: "Could not decode: " + e.message }; }
  }
  const CLAIMS = { iss: "Issuer", sub: "Subject", aud: "Audience", exp: "Expires at", nbf: "Not valid before", iat: "Issued at", jti: "JWT ID", name: "Full name", email: "Email", role: "Role", scope: "Scopes", azp: "Authorized party" };
  function claims(payload, now = Date.now()) {
    return Object.entries(payload).map(([k, v]) => {
      const c = { key: k, label: CLAIMS[k] || null, value: v };
      if (["exp", "nbf", "iat", "auth_time"].includes(k) && typeof v === "number") c.date = new Date(v * 1000).toISOString();
      return c;
    });
  }
  function status(payload, now = Date.now()) {
    const s = Math.floor(now / 1000);
    if (typeof payload.nbf === "number" && s < payload.nbf) return { state: "pending", text: `Not valid for another ${human(payload.nbf - s)}` };
    if (typeof payload.exp === "number") return s >= payload.exp ? { state: "expired", text: `Expired ${human(s - payload.exp)} ago` } : { state: "valid", text: `Expires in ${human(payload.exp - s)}` };
    return { state: "noexp", text: "No expiry (exp) claim" };
  }
  function human(sec) {
    const u = [["d", 86400], ["h", 3600], ["m", 60], ["s", 1]];
    const out = []; for (const [n, v] of u) if (sec >= v || (n === "s" && !out.length)) { out.push(Math.floor(sec / v) + n); sec %= v; if (out.length === 2) break; }
    return out.join(" ");
  }
  const ALG = { HS256: "SHA-256", HS384: "SHA-384", HS512: "SHA-512" };
  async function hmac(alg, secret, data) {
    const key = await subtle().importKey("raw", enc.encode(secret), { name: "HMAC", hash: ALG[alg] }, false, ["sign"]);
    return bytesToB64url(await subtle().sign("HMAC", key, enc.encode(data)));
  }
  async function verify(token, secret) {
    const d = decode(token); if (!d.ok) return { ok: false, error: d.error };
    const alg = d.header.alg;
    if (!ALG[alg]) return { ok: false, error: `Only HS256/384/512 can be verified in the browser (token uses ${alg})` };
    const sig = await hmac(alg, secret, d.parts[0] + "." + d.parts[1]);
    return { ok: true, valid: sig === d.signature };
  }
  async function sign(payload, secret, alg = "HS256") {
    if (!ALG[alg]) throw new Error("Unsupported alg " + alg);
    const head = jsonToB64url({ alg, typ: "JWT" }) + "." + jsonToB64url(payload);
    return head + "." + (await hmac(alg, secret, head));
  }
  return { decode, claims, status, verify, sign, human, CLAIMS };
});
