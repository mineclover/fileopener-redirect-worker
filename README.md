# Fopen Redirect Worker

Cloudflare Worker that redirects HTTP URLs to `fopen://` protocol.

## URL Format Conversion

**Before**: `<domain.url>/<projectName>/src/readme.md`
**After**: `fopen://<projectName>/src/readme.md`

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update your domain in `wrangler.toml`:
```toml
[[routes]]
pattern = "your-domain.com/*"
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

Visit: `https://your-domain.com/myProject/src/readme.md`

The worker will redirect to: `fopen://myProject/src/readme.md`

## How It Works

This Cloudflare Worker acts as a bridge between web browsers and the `fopen://` custom protocol:

1. **HTTP to Protocol Conversion**: Converts standard HTTP URLs to custom `fopen://` protocol URLs
2. **Instant Redirect**: Uses HTTP 302 redirect for seamless protocol handoff
3. **Browser Integration**: Works with custom protocol handlers registered in the operating system

### Redirect Flow

```
https://your-domain.com/myProject/src/readme.md
                    ↓
              302 Redirect
                    ↓
        fopen://myProject/src/readme.md
                    ↓
           OS Protocol Handler
                    ↓
         Opens file in editor
```

## Protocol Handler Setup

To handle `fopen://` URLs on your system, you'll need a protocol handler application.
See [url-fileopener](https://github.com/mineclover/url-fileopener) for the actual protocol handler implementation.

**Note**: This project has not been tested on Windows or other operating systems yet. Testing and contributions for cross-platform compatibility are welcome.

## Features

- Automatic protocol conversion
- Instant HTTP 302 redirects
- Error handling for invalid URLs
- Cross-browser compatibility
- Clean, simple URL format