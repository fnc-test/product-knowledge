//
// Test logic for the skill framework
// See copyright notice in the top folder
// See authors file in the top folder
// See license file in the top folder
//

import { listAssets } from '../src/index';

describe('testing skill framework', () => {
    test('empty string should result in zero', () => {
      expect(listAssets()).toHaveLength(1);
    });
  });