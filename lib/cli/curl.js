import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import request from '../lifts/request.js';
import * as dirs from './dirs.js';

export default async function curl(url, resortId) {
  const dst = path.join(dirs.test, 'example', `${resortId}.html`);
  const dstStream = fs.createWriteStream(dst);

  console.log('Fetching %s to %s...', url.host + url.pathname, dst);
  const res = await request(url);
  return pipeline(res.body, dstStream);
}
