Klache
======

Klache is a simple [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) wrapper with cache expiry built-in and hey, you use it in the browser.

## Getting Started

```
npm install klache
```

Include the script.

```
<script src="/klache/dist/klache.min.js"></script>
```

**Example**

```
var data = klache.get('myStorageKey');
if (!data){
  // fetch new data or do something...
  var data = {foo:'bar'};
  klache.set('myStorageKey', data, 60);
};
```

## API

**klache.removeAll()**

Delete all local storage objects.

**klache.removeKey** (string $key)

Delete a local storage object by key.

| param    | type    | description                             |
|:---------|:--------|:----------------------------------------|
| $key     | string  | the local storage object key to remove. |

Example:

```
klache.removeKey('myKey');
```

**klache.get** (string $key)

Get local storage object by key.

| param    | type    | description                               |
|:---------|:--------|:------------------------------------------|
| $key     | string  | the local storage object key to retrieve. |

Example:

```
var data = klache.get('myStorageKey');
```

**klache.set** (string $key, object $payload, int $expiryInSeconds)

Create or update a local storage object by key.

| param            | type    | description                          |
|:-----------------|:--------|:-------------------------------------|
| $key             | string  | the local storage object key.        |
| $payload         | object  | the object to store.                 |
| $expiryInSeconds | int     | the expiry time in seconds.          |

Example:

```
// create a local storage object that expires in 60 seconds...
klache.set('myStorageKey', {foo:'bar'}, 60);
```

## Test

See `/test` directory.
