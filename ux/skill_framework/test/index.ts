//
// Test logic for the skill framework
// See copyright notice in the top folder
// See authors file in the top folder
// See license file in the top folder
//

import { getConnectorFactory } from '../src/index';
import {jest} from '@jest/globals';

/**
 * test the mock connector
 */
describe('testing skill framework', () => {
  jest.setTimeout(15000);
  test('empty string should result in zero', async () => {
      var connector = getConnectorFactory().create();
      var catalogue = await connector.listAssets();
      expect(catalogue.id).toBeDefined();
      expect(catalogue.contractOffers.length).toBeGreaterThan(0);
    });
});