const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
// Known token from jwt.io (secret: "your-256-bit-secret")
const IO = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

test("decodes header and payload", () => {
  const d = C.decode("Bearer " + IO);
  assert.equal(d.ok, true);
  assert.equal(d.header.alg, "HS256");
  assert.equal(d.payload.name, "John Doe");
});
test("rejects malformed tokens", () => {
  assert.equal(C.decode("abc.def").ok, false);
});
test("verifies a known HS256 signature", async () => {
  assert.equal((await C.verify(IO, "your-256-bit-secret")).valid, true);
  assert.equal((await C.verify(IO, "wrong")).valid, false);
});
test("sign then verify round-trips", async () => {
  for (const alg of ["HS256", "HS384", "HS512"]) {
    const t = await C.sign({ a: 1 }, "s3cret", alg);
    assert.equal(C.decode(t).header.alg, alg);
    assert.equal((await C.verify(t, "s3cret")).valid, true);
  }
});
test("status reports expiry", () => {
  const now = 1_700_000_000_000;
  assert.equal(C.status({ exp: now / 1000 - 10 }, now).state, "expired");
  assert.equal(C.status({ exp: now / 1000 + 7200 }, now).text, "Expires in 2h");
  assert.equal(C.status({}, now).state, "noexp");
});
