const debug = err => console.warn(err);

const encode = value => {
  try {
    return encodeURIComponent(value);
  } catch (e) {
    debug(e);
  }
};

const decode = value => {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    debug(e);
  }
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 */
const set = (name, value, options = {}) => {
  let str = encode(name) + "=" + encode(value);

  if (null === value) options.maxage = -1;

  if (options.maxage) {
    options.expires = new Date(+new Date() + options.maxage);
  }

  if (options.path) str += "; path=" + options.path;
  if (options.domain) str += "; domain=" + options.domain;
  if (options.expires) str += "; expires=" + options.expires.toUTCString();
  if (options.secure) str += "; secure";

  document.cookie = str;
};

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 */
const parse = str =>
  str.split(/ *; */).reduce((obj, pair) => {
    pair = pair.split("=");
    obj[decode(pair[0])] = decode(pair[1]);
    return obj;
  }, {});

/**
 * Return all cookies.
 *
 * @return {Object}
 */
const all = () => parse(document.cookie);

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
  if (name === undefined) return all();
  if (value === undefined) return all()[name];
  set(name, value, options);
};
