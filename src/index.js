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
            <head><title>Invalid URL Format</title></head>
            <body>
              <h1>Invalid URL Format</h1>
              <p><strong>URL format:</strong> <code>${url.origin}/&lt;projectName&gt;/path/to/file</code></p>
              <p><strong>Examples:</strong></p>
              <ul>
                <li><code>${url.origin}/myProject/src/readme.md</code></li>
              </ul>
              <p><strong>Current URL:</strong> <code>${url.href}</code></p>
            </body>
          </html>
        `, {
          status: 400,
          headers: {
            'Content-Type': 'text/html',
          },
        });
      }
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