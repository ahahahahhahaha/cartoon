import MaskedPattern from '../../../src/masked/pattern';


describe('Insert', function () {
  const mask = new MaskedPattern({
    mask: '',
    placeholder: {lazy: false}
  });

  beforeEach(function () {
    mask.mask = '';
    mask.unmaskedValue = '';
  });

  it('should skip empty and consider dot', function () {
    mask.mask = '0{.}0';
    mask.unmaskedValue = '.2';

    assert.equal(mask.value, '_.2');
  });

  it('should skip empty and not consider dot', function () {
    mask.mask = '0.0';
    mask.unmaskedValue = '.2';

    assert.equal(mask.value, '_._');
  });

  it('should not skip empty', function () {
    ['0.0', '0{.}0'].forEach(pattern => {
      mask.mask = pattern;
      mask.value = '.2';
      assert.equal(mask.value, '2._');
    });
  });
});
