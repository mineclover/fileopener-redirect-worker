export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    let projectName, filePath;

    // Parse URL format: /<projectName>/path/to/file
    let pathMatch = url.pathname.match(/^\/([^\/]+)\/(.+)$/);

    if (pathMatch) {
      [, projectName, filePath] = pathMatch;
    } else {
      // If still no match, show error with better guidance
      return new Response(`
        <html>
          <head>
            <title>Invalid URL Format</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
              code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; }
              .setup-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .github-link { color: #0366d6; text-decoration: none; }
              .github-link:hover { text-decoration: underline; }
            </style>
          </head>
          <body>
            <h1>Invalid URL Format</h1>
            <p><strong>URL format:</strong> <code>${url.origin}/&lt;projectName&gt;/path/to/file</code></p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li><code>${url.origin}/myProject/src/readme.md</code></li>
            </ul>
            <p><strong>Current URL:</strong> <code>${url.href}</code></p>
            
            <div class="setup-section">
              <h2>🔧 Protocol Handler Setup Required</h2>
              <p>To use this service, you need to install a protocol handler for <code>fopen://</code> URLs.</p>
              <p><strong>Install the protocol handler:</strong></p>
              <ol>
                <li>Clone <a href="https://github.com/mineclover/url-fileopener" class="github-link">url-fileopener</a></li>
                <li>Follow the installation instructions in their README</li>
                <li>This will register the <code>fopen://</code> protocol on your system</li>
              </ol>
              <p><strong>GitHub:</strong> <a href="https://github.com/mineclover/url-fileopener" class="github-link">https://github.com/mineclover/url-fileopener</a></p>
            </div>
          </body>
        </html>
      `, {
        status: 400,
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    // Create the fopen:// protocol URL
    const redirectUrl = `fopen://${projectName}/${filePath}`;

    // Direct redirect (no page opens) - most seamless experience
    return new Response(null, {
      status: 302,
      headers: {
        'Location': redirectUrl,
      },
    });
  },
};