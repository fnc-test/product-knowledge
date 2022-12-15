import {
  getConnectorFactory,
  BindingSet,
} from '@catenax-ng/skill-framework/dist/src';
import { DataList } from '../../DataList';

import React, { useEffect, useState } from 'react';

function AssetList() {
  const [searchResult, setSearchResult] = useState<BindingSet>();

  useEffect(() => {
    const connector = getConnectorFactory().create();
    connector.execute('Dataspace', {}).then((catalogue) => {
      setSearchResult(catalogue);
    });
  }, []);

  return (
    <>
      {searchResult && (
        <DataList search="Assets" id="asset" data={searchResult} />
      )}
    </>
  );
}

export default AssetList;
