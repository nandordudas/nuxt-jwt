# Nuxt 3 Minimal Starter

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)
[![CI](https://github.com/nandordudas/nuxt-core/actions/workflows/ci.yml/badge.svg)](https://github.com/nandordudas/nuxt-core/actions/workflows/ci.yml)

## [mkcert]

```bash
mkcert -install
mkcert localhost 127.0.0.1 ::1
```

Copy `localhost+2.pem` and `localhost+2-key.pem` to `/tmp` folder.

```bash
sed -i "s/NUXT_JWT_ACCESS_TOKEN_SECRET=.*/NUXT_JWT_ACCESS_TOKEN_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")/" .env.local
sed -i "s/NUXT_JWT_REFRESH_TOKEN_SECRET=.*/NUXT_JWT_REFRESH_TOKEN_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")/" .env.local
```

## Setup

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

[mkcert]: https://github.com/FiloSottile/mkcert
