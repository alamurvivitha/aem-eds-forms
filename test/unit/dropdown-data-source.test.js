/* eslint-env mocha */
import assert from 'assert';
import { createDropdownUsingEnum } from '../../blocks/form/util.js';

describe('Dropdown data source', () => {
  beforeEach(() => {
    global.fetch.mockData = {};
  });

  function flushAsync() {
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  it('loads options from properties.optionsSource URL with data path', async () => {
    const url = 'https://api.example.com/countries.json';
    global.fetch.mockData[url] = {
      data: [
        { Option: 'India', Value: 'IN' },
        { Option: 'United States', Value: 'US' },
      ],
    };

    const fd = {
      id: 'country-id',
      fieldType: 'drop-down',
      name: 'country',
      type: 'string',
      required: false,
      value: 'US',
      properties: {
        optionsSource: url,
      },
    };

    const select = document.createElement('select');
    createDropdownUsingEnum(fd, select);
    await flushAsync();

    const options = [...select.querySelectorAll('option')];
    assert.strictEqual(options.length, 2);
    assert.strictEqual(options[0].textContent, 'India');
    assert.strictEqual(options[0].value, 'IN');
    assert.strictEqual(options[1].textContent, 'United States');
    assert.strictEqual(options[1].value, 'US');
    assert.strictEqual(select.value, 'US');
  });

  it('loads options from JSON array using custom label/value keys', async () => {
    const url = 'https://api.example.com/items';
    global.fetch.mockData[url] = {
      result: {
        rows: [
          { name: 'Option A', code: 'A' },
          { name: 'Option B', code: 'B' },
        ],
      },
    };

    const fd = {
      id: 'options-id',
      fieldType: 'drop-down',
      name: 'options',
      type: 'string',
      required: false,
      value: 'B',
      properties: {
        optionsSource: {
          url,
          path: 'result.rows',
          labelKey: 'name',
          valueKey: 'code',
        },
      },
    };

    const select = document.createElement('select');
    createDropdownUsingEnum(fd, select);
    await flushAsync();

    const options = [...select.querySelectorAll('option')];
    assert.strictEqual(options.length, 2);
    assert.strictEqual(options[0].textContent, 'Option A');
    assert.strictEqual(options[0].value, 'A');
    assert.strictEqual(options[1].textContent, 'Option B');
    assert.strictEqual(options[1].value, 'B');
    assert.strictEqual(select.value, 'B');
  });

  it('preserves static enum behavior when optionsSource is not provided', () => {
    const fd = {
      id: 'static-id',
      fieldType: 'drop-down',
      name: 'state',
      type: 'string',
      required: false,
      value: 'KA',
      enum: ['KA', 'TN'],
      enumNames: ['Karnataka', 'Tamil Nadu'],
    };

    const select = document.createElement('select');
    createDropdownUsingEnum(fd, select);

    const options = [...select.querySelectorAll('option')];
    assert.strictEqual(options.length, 2);
    assert.strictEqual(options[0].textContent, 'Karnataka');
    assert.strictEqual(options[0].value, 'KA');
    assert.strictEqual(select.value, 'KA');
  });
});
