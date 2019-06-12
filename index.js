const debug = err => {
  console.warn(err);
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 */
function set(name, value, options) {
  options = options || {};
  let str = encode(name) + "=" + encode(value);

  if (null == value) options.maxage = -1;

  if (options.maxage) {
    options.expires = new Date(+new Date() + options.maxage);
  }

  if (options.path) str += "; path=" + options.path;
  if (options.domain) str += "; domain=" + options.domain;
  if (options.expires) str += "; expires=" + options.expires.toUTCString();
  if (options.secure) str += "; secure";

  document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 */
function all() {
  try {
    return parse(document.cookie);
  } catch (err) {
    debug(err);
    return {};
  }
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 */
function get(name) {
  return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 */
function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ("" === pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split("=");
    obj[decode(pair[0])] = decode(pair[1]);
  }
  return obj;
}

function encode(value) {
  try {
    return encodeURIComponent(value);
  } catch (e) {
    debug(e);
  }
}

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    debug(e);
  }
}

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */
export default (name, value, options) => {
  if (name !== undefined && value !== undefined) {
    return set(name, value, options);
  } else if (name !== undefined) {
    return get(name);
  }
  return all();
};
