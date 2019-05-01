/* Klache v1x | https://github.com/woodscreative/klache */

klache = {};
klache.version = '1.0.0';

/**
 * Get local storage object
 *
 * @param string $key the local storage object key
 * @return object payload or null if empty or expired
 */
klache.get = function($key){
  
  if (!window.localStorage.getItem($key)){
    return;
  };
  var payload = JSON.parse(window.localStorage.getItem($key));
  if (payload){
    
    // set to true to expire this storage item
    var hasExpired = false;
    
    // check storage version...
    var v = payload.storage.version;
    if (v != klache.version){
      hasExpired = true;
    };
    
    // check cache expiry...
    if (payload.storage.expires > 0){
      var now = klache.getTimestamp();
      var cacheExpiryTime = parseFloat(payload.storage.expires);
      var timestamp = payload.storage.timestamp;
      var secondsThatHaveExpired = cacheExpiryTime-(now-timestamp);
      if (secondsThatHaveExpired <= 0){
        hasExpired = true;
      };
    };
    
    // Expired?
    if (hasExpired){
      klache.removeKey($key);
      return null;
    };
    return payload.data;
  };
};

/**
 * Get todays date as timestamp
 *
 * @return int
 */
klache.getTimestamp = function() {
  return parseInt(new Date().getTime()/1000);
};

/**
 * Clear all local storage objects
 */
klache.removeAll = function(){
  window.localStorage.clear();
};

/**
 * Clear local storage object by key
 * @param string $key the storage key
 */
klache.removeKey = function($key){
  window.localStorage.removeItem($key);  
};

/**
 * Set local storage object
 *
 * @param string $key the local storage object key
 * @param object $payload the object to store
 * @param int $expiryInSeconds the expiry time in seconds
 * @return object payload.data the payload
 */
klache.set = function($key, $payload, $expiryInSeconds){
  
  var payload = {};
  
  // the storage configuration...
  payload.storage = {
    // version the storage item
    version : klache.version,
    // the current timestamp in seconds
    timestamp : klache.getTimestamp(),
    // the cache expiry time in seconds
    expires: 0
  };
  
  // if defined add expiry time in seconds...
  if ($expiryInSeconds){
    payload.storage.expires = $expiryInSeconds;
  };
  
  // add data property
  payload.data = $payload;
  
  window.localStorage.setItem($key, JSON.stringify(payload));
  return payload.data;
  
};