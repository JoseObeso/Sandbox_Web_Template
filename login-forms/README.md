# Login Forms — 22 Free HTML Login Form Templates by uiCookies

Twenty-two self-contained login screens — ten skins of the email and password form, plus the rest of the auth flow: one-time code, two-factor, passkey, identifier-first, SSO, phone, lock screen, password reset and error states. Each folder holds one design three ways:
`index.html` (plain CSS, no dependencies), `bootstrap.html` (Bootstrap 5.3.8) and
`tailwind.html` (Tailwind CSS 4). Any JavaScript is a few lines of inline vanilla JS; no build tools.

## Designs

| Folder | Design |
|---|---|
| 01-split | Split-screen login with gradient brand panel |
| 02-card | Minimal centered card with floating labels + show/hide password |
| 03-glass | Dark glassmorphism over animated gradient blobs |
| 04-social | Social-first login (Google / GitHub / Apple) with email fallback |
| 05-border | Animated gradient-border card |
| 06-magic | Passwordless magic-link flow with success state |
| 07-brutal | Neobrutalist login with offset shadows |
| 08-saas | SaaS split login with testimonial/stats panel + SSO button |
| 09-tabs | Login / Create-account tab switcher (accessible tabs) |
| 10-terminal | Developer terminal-themed login |
| 11-otp | One-time code screen with auto-advance, paste support and a resend countdown |
| 12-2fa | Two-factor step with trust-this-device and a recovery-code route |
| 13-passkey | Passkey-first sign-in with a visible password fallback |
| 14-two-step | Identifier-first login — email, then password on a second panel |
| 15-sso | Enterprise SSO with a workspace subdomain field and named providers |
| 16-phone | Phone-number login with a country calling-code selector |
| 17-lock | Session lock screen for a known account |
| 18-reset | Password reset request and its sent confirmation |
| 19-validation | Login with form-level, field-level and Caps Lock error handling |
| 20-photo | Full-bleed background with an overlay card and legibility scrim |
| 21-modal | Modal login over a blurred application view |
| 22-dark | Theme-aware login that follows the OS and can be overridden |

## Usage

Open any `index.html` in a browser or copy the markup into your project.
Forms are demo-safe: most prevent submission with an `onsubmit` attribute, and the
scripted sets (magic link, one-time code, reset, error states) handle submit in their
small script. Point the `<form>` at your backend and remove that handler to wire them up.

## React

Sets 01–08 also ship a `react.html`: the same component as React 19 JSX styled with the same Tailwind CSS 4 classes. The code to copy sits between the `// snippet:jsx` and `// /snippet:jsx` comments — one module that imports only from `react` and has a single default export, which renders the full demo with no props (pass your own data, labels and handlers as props). Ids come from `useId`, inputs are controlled where they hold state, and keyboard behaviour and ARIA attributes match the other versions.

To use it, save the code as a `.jsx` file in a Vite, Next.js or other React project that already has Tailwind CSS 4 (`@import "tailwindcss";`), and paste any `@theme` block from the file's `<style type="text/tailwindcss">` into that stylesheet. The demo page compiles the JSX with Babel in the browser and loads React from esm.sh only so it can be previewed without a build step; do not ship it that way.

## License

See https://uicookies.com/license/ — free to use, attribution appreciated.

Designed and maintained by uiCookies — https://uicookies.com
