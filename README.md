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

To handle `fopen://` URLs on your system, you'll need to install and configure a protocol handler application.

### 🔧 Install Protocol Handler

Use the [url-fileopener](https://github.com/mineclover/url-fileopener) project to register the `fopen://` protocol:

1. **Clone the repository**:
```bash
git clone https://github.com/mineclover/url-fileopener.git
cd url-fileopener
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Build the project**:
```bash
pnpm build
```

4. **Register the protocol handler**:
```bash
# The url-fileopener will register the fopen:// protocol
# Follow the installation instructions in their README
```

### 📋 What url-fileopener Does

The [url-fileopener](https://github.com/mineclover/url-fileopener) project provides:

- **Protocol Registration**: Registers `fopen://` as a custom URL scheme
- **File Opening**: Opens files in your preferred editor/application
- **Cross-platform Support**: Works on macOS, Linux, and Windows
- **TypeScript CLI**: Fully typed command-line interface with Effect.js

### 🔗 Integration Flow

```
Web Browser → Cloudflare Worker → fopen:// URL → url-fileopener → File Editor
```

1. **Web Browser**: User clicks a link like `https://your-domain.com/project/file.js`
2. **Cloudflare Worker**: Redirects to `fopen://project/file.js`
3. **url-fileopener**: Receives the protocol URL and opens the file
4. **File Editor**: File opens in your configured editor (VS Code, Vim, etc.)

**Note**: This project has not been tested on Windows or other operating systems yet. Testing and contributions for cross-platform compatibility are welcome.

## Features

- Automatic protocol conversion
- Instant HTTP 302 redirects
- Error handling for invalid URLs
- Cross-browser compatibility
- Clean, simple URL format