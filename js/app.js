(() => {
  const { $, $$, copy, store, esc, debounce, toast } = Prism;
  const token = $("#token");
  let cur = null;
  function render() {
    store.set("jwt:token", token.value);
    const t = token.value.trim();
    const d = t ? Core.decode(t) : null;
    cur = d && d.ok ? d : null;
    if (!d) { $("#state").className = "pill"; $("#state").textContent = "Paste a token"; $("#alg").textContent = ""; $("#header").textContent = ""; $("#payload").textContent = ""; $("#claims").innerHTML = ""; return; }
    if (!d.ok) { $("#state").className = "pill bad"; $("#state").textContent = d.error; $("#header").textContent = ""; $("#payload").textContent = ""; $("#claims").innerHTML = ""; return; }
    const st = Core.status(d.payload);
    $("#state").className = "pill " + ({ valid: "ok", expired: "bad", pending: "warn", noexp: "warn" }[st.state]);
    $("#state").textContent = st.text;
    $("#alg").className = "pill acc"; $("#alg").textContent = `alg ${d.header.alg || "?"}`;
    $("#header").textContent = JSON.stringify(d.header, null, 2);
    $("#payload").textContent = JSON.stringify(d.payload, null, 2);
    $("#claims").innerHTML = "<tr><th>Claim</th><th>Value</th></tr>" + Core.claims(d.payload).map((c) =>
      `<tr><td>${esc(c.key)}</td><td>${esc(typeof c.value === "object" ? JSON.stringify(c.value) : c.value)}${c.date ? `<small>${esc(new Date(c.date).toLocaleString())}</small>` : ""}${c.label ? `<small>${c.label}</small>` : ""}</td></tr>`).join("");
    check();
  }
  async function check() {
    const s = $("#secret").value, el = $("#sig");
    if (!cur || !s) { el.className = "pill"; el.textContent = "Enter the secret to verify the signature"; return; }
    const r = await Core.verify(token.value, s);
    if (!r.ok) { el.className = "pill warn"; el.textContent = r.error; return; }
    el.className = "pill " + (r.valid ? "ok" : "bad"); el.textContent = r.valid ? "Signature verified" : "Invalid signature";
  }
  async function sample() {
    const now = Math.floor(Date.now() / 1000);
    token.value = await Core.sign({ sub: "1024", name: "Soumya Bhandare", role: "founder", iss: "prism-protocol", iat: now, exp: now + 3600 }, "prism-protocol-secret");
    $("#secret").value = "prism-protocol-secret"; render();
  }
  token.addEventListener("input", debounce(render, 100));
  $("#secret").addEventListener("input", debounce(check, 150));
  $("#sample").onclick = sample;
  $("#clear").onclick = () => { token.value = ""; $("#secret").value = ""; render(); };
  $$("[data-copy]").forEach((b) => (b.onclick = () => (cur ? copy(JSON.stringify(b.dataset.copy === "h" ? cur.header : cur.payload, null, 2)) : toast("Nothing to copy"))));
  $("#spayload").value = JSON.stringify({ sub: "42", name: "Prism Builder", role: "member", scope: ["read", "write"] }, null, 2);
  $("#signBtn").onclick = async () => {
    try {
      const p = JSON.parse($("#spayload").value); const now = Math.floor(Date.now() / 1000); p.iat = now;
      const ex = +$("#sexp").value; if (ex) p.exp = now + ex; else delete p.exp;
      token.value = await Core.sign(p, $("#ssecret").value, $("#salg").value);
      $("#secret").value = $("#ssecret").value; render(); window.scrollTo({ top: 0, behavior: "smooth" }); toast("Token signed");
    } catch (e) { toast("Payload must be valid JSON"); }
  };
  token.value = store.get("jwt:token", "");
  if (!token.value) sample(); else render();
})();
