# Fileopener Redirect Worker

Cloudflare Worker that redirects HTTP URLs to `fileopener://` protocol.

## URL Format Conversion

**Before**: `<domain.url>/fileopener/<projectName>/src/readme.md`
**After**: `fileopener://<projectName>/src/readme.md`

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update your domain in `wrangler.toml`:
```toml
[[routes]]
pattern = "your-domain.com/fileopener/*"
zone_name = "your-domain.com"
```

3. Deploy to Cloudflare:
```bash
npm run deploy
```

## Development

```bash
# Local development
npm run dev

# Preview deployment
npm run preview

# View logs
npm run tail
```

## Usage

Visit: `https://your-domain.com/fileopener/myProject/src/readme.md`

The worker will redirect to: `fileopener://myProject/src/readme.md`

## Features

- Automatic protocol conversion
- HTML fallback with manual link
- Error handling for invalid URLs
- Cross-browser compatibility