export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    let projectName, filePath;

    // Try preferred format first: /fileopener/<projectName>/path/to/file
    let pathMatch = url.pathname.match(/^\/fileopener\/([^\/]+)\/(.+)$/);

    if (pathMatch) {
      [, projectName, filePath] = pathMatch;
    } else {
      // Fallback: treat the entire path as /<projectName>/path/to/file
      pathMatch = url.pathname.match(/^\/([^\/]+)\/(.+)$/);

      if (pathMatch) {
        [, projectName, filePath] = pathMatch;
      } else {
        // If still no match, show error with better guidance
        return new Response(`
          <html>
            <head><title>Invalid URL Format</title></head>
            <body>
              <h1>Invalid URL Format</h1>
              <p><strong>Preferred format:</strong> <code>${url.origin}/fileopener/&lt;projectName&gt;/path/to/file</code></p>
              <p><strong>Alternative format:</strong> <code>${url.origin}/&lt;projectName&gt;/path/to/file</code></p>
              <p><strong>Examples:</strong></p>
              <ul>
                <li><code>${url.origin}/fileopener/myProject/src/readme.md</code></li>
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

    // Create the fileopener:// protocol URL
    const redirectUrl = `fileopener://${projectName}/${filePath}`;

    // Direct redirect (no page opens) - most seamless experience
    return new Response(null, {
      status: 302,
      headers: {
        'Location': redirectUrl,
      },
    });
  },
};