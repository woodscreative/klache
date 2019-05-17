Klache
======

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Klache is a simple javascript [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) wrapper with cache expiry built-in and hey, you use it in the browser.

## Contents

+ [Installation](#installation)
+ [Getting Started](#getting-started)
+ [Example](#example)
+ [API](#api)
+ [Tests](#tests)


## Installation

```
npm install klache
```


## Getting Started

Include the script from the `/dist` directory

```
<script src="dist/klache.min.js"></script>
```

or use klache as a [UMD](https://github.com/umdjs/umd) and bundle it using [Webpack](https://webpack.js.org/).

```
var klache = require('klache')
```


## Example

```
var cache = {key:'myStorageKey', expires:60};
var data = klache.get(cache.key);
if (!data){
  // fetch new data or do something...
  var data = {foo:'bar'};
  // create a local storage object that expires in 60 seconds...
  klache.set(cache.key, data, cache.expires);
  console.log('Saved to localStorage:', data);
} else {
  console.log('Retrieved from localStorage:', data);
}
```


## API

### klache.removeAll()

Delete all local storage objects.

*Example*

```
klache.removeAll();
```

### klache.removeKey(string $key)

Delete a local storage object by key.

| param    | type    | description                             |
|:---------|:--------|:----------------------------------------|
| $key     | string  | the local storage object key to remove. |


*Example*

```
klache.removeKey('myKey');
```

### klache.get(string $key)

Get a local storage object by key.

| param    | type    | description                               |
|:---------|:--------|:------------------------------------------|
| $key     | string  | the local storage object key to retrieve. |


*Example*

```
var data = klache.get('myStorageKey');
```

### klache.set(string $key, object $payload, int $expiryInSeconds)

Create or update a local storage object by key.

| param            | type    | description                          |
|:-----------------|:--------|:-------------------------------------|
| $key             | string  | the local storage object key.        |
| $payload         | object  | the object to store.                 |
| $expiryInSeconds | int     | the expiry time in seconds.          |

*Example*

```
// create a local storage object that expires in 60 seconds...
klache.set('myStorageKey', {foo:'bar'}, 60);
```


## Tests

See `/tests` directory for basic distribution and Webpack bundle tests.
