'use strict';

var BatchError = require('../errors/batch');

/**
 * @method batch
 * @description
 * **Alternative Syntax:**
 * `batch(values, {cb})` &#8658; `Promise`
 *
 * Settles (resolves or rejects) every [mixed value]{@tutorial mixed} in the input array.
 *
 * The method resolves with an array of results, the same as the standard $[promise.all],
 * while providing comprehensive error details in case of a reject, in the form of
 * type {@link errors.BatchError BatchError}.
 *
 * @param {Array} values
 * Array of [mixed values]{@tutorial mixed} (it can be empty), to be resolved asynchronously, in no particular order.
 *
 * Passing in anything other than an array will reject with {@link external:TypeError TypeError} =
 * `Method 'batch' requires an array of values.`
 *
 * @param {Function|generator} [cb]
 * Optional callback (or generator) to receive the result for each settled value.
 *
 * Callback Parameters:
 *  - `index` = index of the value in the source array
 *  - `success` - indicates whether the value was resolved (`true`), or rejected (`false`)
 *  - `result` = resolved data, if `success`=`true`, or else the rejection reason
 *  - `delay` = number of milliseconds since the last call (`undefined` when `index=0`)
 *
 * The function inherits `this` context from the calling method.
 *
 * It can optionally return a promise to indicate that notifications are handled asynchronously.
 * And if the returned promise resolves, it signals a successful handling, while any resolved
 * data is ignored.
 *
 * If the function returns a rejected promise or throws an error, the entire method rejects
 * with {@link errors.BatchError BatchError} where the corresponding value in property `data`
 * is set to `{success, result, origin}`:
 *  - `success` = `false`
 *  - `result` = the rejection reason or the error thrown by the notification callback
 *  - `origin` = the original data passed into the callback as object `{success, result}`
 *
 * @returns {external:Promise}
 *
 * The method resolves with an array of individual resolved results, the same as the standard $[promise.all].
 * In addition, the array is extended with a hidden read-only property `duration` - number of milliseconds
 * spent resolving all the data.
 *
 * The method rejects with {@link errors.BatchError BatchError} when any of the following occurs:
 *  - one or more values rejected or threw an error while being resolved as a [mixed value]{@tutorial mixed}
 *  - notification callback `cb` returned a rejected promise or threw an error
 *
 */
function batch(values, cb, config) {

    var $p = config.promise, $utils = config.utils;

    if (!Array.isArray(values)) {
        return $p.reject(new TypeError("Method 'batch' requires an array of values."));
    }

    if (!values.length) {
        var empty = [];
        $utils.extend(empty, 'duration', 0);
        return $p.resolve(empty);
    }

    cb = $utils.wrap(cb);
    var self = this, start = Date.now();
    return $p(function (resolve, reject) {
        var cbTime, errors = [], remaining = values.length,
            result = new Array(remaining);
        values.forEach(function (item, i) {
            $utils.resolve.call(self, item, null, function (data) {
                result[i] = data;
                step(i, true, data);
            }, function (reason) {
                result[i] = {success: false, result: reason};
                errors.push(i);
                step(i, false, reason);
            });
        });
        function step(idx, pass, data) {
            if (cb) {
                var cbResult, cbNow = Date.now(),
                    cbDelay = idx ? (cbNow - cbTime) : undefined;
                cbTime = cbNow;
                try {
                    cbResult = cb.call(self, idx, pass, data, cbDelay);
                } catch (e) {
                    setError(e);
                }
                if ($utils.isPromise(cbResult)) {
                    cbResult
                        .then(check)
                        .catch(function (error) {
                            setError(error);
                            check();
                        });
                } else {
                    check();
                }
            } else {
                check();
            }

            function setError(e) {
                var r = pass ? {success: false} : result[idx];
                if (pass) {
                    result[idx] = r;
                    errors.push(idx);
                }
                r.result = e;
                r.origin = {success: pass, result: data}
            }

            function check() {
                if (!--remaining) {
                    if (errors.length) {
                        errors.sort();
                        if (errors.length < result.length) {
                            for (var i = 0, k = 0; i < result.length; i++) {
                                if (i === errors[k]) {
                                    k++;
                                } else {
                                    result[i] = {success: true, result: result[i]};
                                }
                            }
                        }
                        reject(new BatchError(result, errors, Date.now() - start));
                    } else {
                        $utils.extend(result, 'duration', Date.now() - start);
                        resolve(result);
                    }
                }
                return null; // this dummy return is just to prevent Bluebird warnings;
            }
        }
    });
}

module.exports = function (config) {
    return function (values, cb) {
        if (cb && typeof cb === 'object') {
            return batch.call(this, values, cb.cb, config);
        } else {
            return batch.call(this, values, cb, config);
        }
    };
};
