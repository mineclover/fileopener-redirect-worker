import assert from 'node:assert/strict';
import test from 'node:test';

import worker from '../src/index.js';

test('returns a 400 page for a malformed redirect path', async () => {
  const response = await worker.fetch(new Request('https://example.test/fileopener/demo'));

  assert.equal(response.status, 400);
  assert.match(await response.text(), /Invalid URL Format/);
});

test('creates a fileopener URL from a project and a relative file path', async () => {
  const response = await worker.fetch(
    new Request('https://example.test/fileopener/demo/src/readme.md'),
  );
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /fileopener:\/\/demo\/src\/readme\.md/);
});

test('encodes path values before embedding them in the response', async () => {
  const response = await worker.fetch(
    new Request('https://example.test/fileopener/demo/%3Cscript%3Ealert(1)%3C%2Fscript%3E.md'),
  );
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.doesNotMatch(body, /<script>alert\(1\)<\/script>\.md/);
  assert.match(body, /%3Cscript%3Ealert\(1\)%3C%2Fscript%3E\.md/);
});
