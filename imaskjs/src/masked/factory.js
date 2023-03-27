import {isString} from '../core/utils';
import Masked from './base';
import MaskedRegExp from './regexp';
import MaskedFunction from './function';
import MaskedNumber from './number';


export
function maskedClass (mask) {
  if (mask instanceof RegExp) return MaskedRegExp;
  if (isString(mask)) return IMask.MaskedPattern;
  if (mask.prototype instanceof Masked) return mask;
  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return MaskedNumber;
  if (mask instanceof Date || mask === Date) return IMask.MaskedDate;
  if (mask instanceof Function) return MaskedFunction;

  console.warn('Mask not found for mask', mask);  // eslint-disable-line no-console
  return Masked;
}


export default
function createMask (opts) {
  opts = Object.assign({}, opts);  // clone
  const mask = opts.mask;

  if (mask instanceof Masked) return mask;

  const MaskedClass = maskedClass(mask);
  return new MaskedClass(opts);
}
