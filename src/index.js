export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Parse the URL path to extract projectName and filePath
    // Expected format: /fileopener/<projectName>/path/to/file
    const pathMatch = url.pathname.match(/^\/fileopener\/([^\/]+)\/(.+)$/);

    if (!pathMatch) {
      return new Response(`
        <html>
          <head><title>Invalid URL Format</title></head>
          <body>
            <h1>Invalid URL Format</h1>
            <p>Expected format: <code>&lt;domain.url&gt;/fileopener/&lt;projectName&gt;/path/to/file</code></p>
            <p>Example: <code>https://your-domain.com/fileopener/myProject/src/readme.md</code></p>
          </body>
        </html>
      `, {
        status: 400,
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    const [, projectName, filePath] = pathMatch;

    // Create the fileopener:// protocol URL
    const redirectUrl = `fileopener://${projectName}/${filePath}`;

    // Return HTML page that triggers the custom protocol
    return new Response(`
      <html>
        <head>
          <title>Redirecting to File Opener</title>
          <meta http-equiv="refresh" content="0; url=${redirectUrl}">
        </head>
        <body>
          <h1>Redirecting...</h1>
          <p>If automatic redirect doesn't work, click: <a href="${redirectUrl}">Open in File Opener</a></p>
          <script>
            // Try to open the custom protocol immediately
            window.location.href = "${redirectUrl}";

            // Fallback message after 3 seconds
            setTimeout(function() {
              document.body.innerHTML = \`
                <h1>Protocol Handler Required</h1>
                <p>To open this file, you need to have a file opener application installed that handles the <code>fileopener://</code> protocol.</p>
                <p>Target URL: <code>${redirectUrl}</code></p>
              \`;
            }, 3000);
          </script>
        </body>
      </html>
    `, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
};