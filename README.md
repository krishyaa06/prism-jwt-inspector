<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:D7A8FF,100:FF6B8A&height=200&section=header&text=Prism%20JWT%20Inspector&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Decode%20%C2%B7%20Verify%20%C2%B7%20Sign%20%C2%B7%20100%25%20local&descAlignY=58&descSize=16" width="100%" alt="Prism JWT Inspector" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=D7A8FF&center=true&vCenter=true&width=680&lines=Paste+a+JWT.+See+everything.;Expires+in+59m+12s;Verify+HS256+with+Web+Crypto;Your+tokens+never+leave+the+tab" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-jwt-inspector/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-jwt-inspector/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-jwt-inspector/"><img src="https://img.shields.io/badge/Live_Demo-Open-D7A8FF?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-D7A8FF?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-jwt-inspector?style=for-the-badge&color=FF6B8A" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism JWT Inspector screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism JWT Inspector** is a private alternative to pasting production tokens into random websites. It decodes the header and payload, lists every claim with human-readable dates, shows whether the token is valid, expired or not yet active, and verifies HMAC signatures using the browser's Web Crypto API. You can also sign new test tokens.

## ✨ Features

- **Instant decode** of header and payload (accepts `Bearer ...` too)
- **Expiry status**: valid, expired or not-yet-valid with countdown
- **Claims table** with labels and local dates for `exp`, `iat`, `nbf`
- **Signature verification** for HS256, HS384 and HS512
- **Token creator** with payload editor and expiry presets
- Runs offline, no network requests, no analytics

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism JWT Inspector on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism JWT Inspector on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-jwt-inspector/](https://krishyaa06.github.io/prism-jwt-inspector/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-jwt-inspector.git
cd prism-jwt-inspector
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Paste a token in **Encoded token**.
2. Read the header, payload and claims on the right.
3. Enter the secret to verify an HMAC signature.
4. Use **Create a token** to sign test JWTs for local development.

> RS256/ES256 tokens can be decoded but not verified, since that needs the public key.

## 📁 Project Structure

```
prism-jwt-inspector/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # decode, verify and sign via Web Crypto — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism JWT Inspector is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF6B8A,50:D7A8FF,100:07060f&height=110&section=footer" width="100%" />
