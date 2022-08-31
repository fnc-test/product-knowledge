import { Table } from 'cx-portal-shared-components';
import { GridColDef  } from '@mui/x-data-grid'
import {getConnectorFactory, AssetProperties} from '@knowledge-agents-ux/skill_framework/dist/src'
import React, { useEffect, useState } from 'react';

function AssetList() {
  const [assetList, setAssetList] = useState<AssetProperties[]>([])

  useEffect(() => {
    const connector = getConnectorFactory().create();
    connector.listAssets().then(catalogue => setAssetList(catalogue.contractOffers.map(offer => offer.asset.properties)));
  }, [])

  const columns: GridColDef[] = [
    { field: 'asset:prop:id', headerName: 'ID', flex: 3 },
    { field: 'asset:prop:name', headerName: 'Name', flex: 3 },
    { field: 'ids:byteSize', headerName: 'Byte Size', flex: 3 },
    { field: 'asset:prop:version', headerName: 'Version', flex: 2 },
    { field: 'ids:fileName', headerName: 'Filename', flex: 2 },
    { field: 'asset:prop:contenttype', headerName: 'Content Type', flex: 2 },
    { field: 'asset:prop:policy-id', headerName: 'Policy ID', flex: 3},
    { field: 'agreement', headerName: 'Agreement', flex: 1, type: 'boolean'},
  ];

  return (
    <Table
      rowsCount={assetList.length}
      title="Asset List"
      toolbar={{onSearch: (input) => console.log(input)}}
      disableSelectionOnClick={true}
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      disableDensitySelector={true}
      rows={assetList}
      getRowId={(row) => row['asset:prop:id']}
      columns={columns}
    />
  );
}

export default AssetList;