/* eslint-disable */
// The MIT License (MIT)
//
// Copyright (c) 2014 Jonas Finnemann Jensen
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { parse, stringify } from 'uuid';

/** @type {(bytes: Uint8Array) => string} */
var toBase64 = (() => {
  if (typeof Buffer !== 'undefined') {
    return (bytes: any) => Buffer.from(bytes).toString('base64');
  }
  return (bytes: any) => btoa(String.fromCharCode(...bytes));
})();

/** @type {(base64: string) => Uint8Array | Buffer} */
var fromBase64 = (() => {
  if (typeof Buffer !== 'undefined') {
    return (base64: any) => Buffer.from(base64, 'base64');
  }
  return (base64: any) => Uint8Array.from(atob(base64), c => c.charCodeAt(0));
})();

/**
 * Returns the given uuid as a 22 character slug. This can be a regular v4
 * slug or a "nice" slug.
 */
export function encode(uuid_: string): string {
  var bytes = parse(uuid_);
  var base64 = toBase64(bytes);
  var slug = base64
    .replace(/\+/g, '-')  // Replace + with - (see RFC 4648, sec. 5)
    .replace(/\//g, '_')  // Replace / with _ (see RFC 4648, sec. 5)
    .substring(0, 22);    // Drop '==' padding
  return slug;
};

/**
 * Returns the uuid represented by the given v4 or "nice" slug
 */
export function decode(slug: string): string {
  var base64 = slug
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    + '==';
  return stringify(fromBase64(base64));
};
