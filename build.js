/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

const {
  readFileSync,
  writeFileSync,
} = require('fs');

const licenseText = `/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */
"use strict";`;

const observableSource = readFileSync('./dist/IndefiniteObservable.js').toString();
const subjectSource = readFileSync('./dist/IndefiniteSubject.js').toString();
const wrapListenerWithObserverSource = readFileSync('./dist/wrapListenerWithObserver.js').toString();
const symbolObservable = readFileSync('./third_party/symbol-observable/index.js').toString();

writeFileSync(
  './dist/indefinite-observable.js',
  licenseText + '\n' +[
    observableSource.replace(licenseText, ''),
    subjectSource.replace(licenseText, ''),
    wrapListenerWithObserverSource.replace(licenseText, ''),
  ].join('\n\n').replace(
    /const symbol_observable_\d = require\("symbol-observable"\);/,
    symbolObservable
  ).replace(
    /const symbol_observable_\d = require\("symbol-observable"\);/,
    ''
  ).replace(
    /const wrapListenerWithObserver_\d = require\(".\/wrapListenerWithObserver"\);/g,
    ''
  ).replace(
    // strip comments
    /\n^\s*\/\/.*$/mg,
    ''
  ).replace(
    /symbol_observable_\d\.default/g,
    '$$observable'
  ).replace(
    /wrapListenerWithObserver_\d\.default/g,
    'wrapListenerWithObserver'
  ).replace(
    /Object\.defineProperty\(exports, "__esModule", \{ value: true \}\);/g,
    ''
  ).replace(
    /exports\.default = \w+;/g,
    ''
  ).replace(
    /\n\n+/g,
    '\n\n'
  )
);
