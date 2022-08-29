import { Table } from 'cx-portal-shared-components';
import { GridColDef  } from '@mui/x-data-grid'
import React from 'react';
import {getConnectorFactory} from '@knowledge-agents-ux/skill_framework/dist/src';

function AssetList() {
  const connector = getConnectorFactory().create();
  connector.listAssets().then(r => console.log(r))

  const rows = [
    { id: 'urn:graph:bmw#DTC',
      name: 'Diagnose Codes aller BMW Plattformen',
      connector: 'http://connector.cx-rel.edc.aws.bmw.cloud:8282/BPNL00000003AYRE',
      category: 'Diagnosis',
      type: 'Skill',
      contract: '82e4fe96-eb9f-4a18-863c-386f1fbe04da:319138e8-985c-498f-be6d-e109c860af04',
      agreement: true,
      offerer: 'BMW'
    },
    { id: 'urn:skill:zf#LifetimePrognosis',
      name: 'Lebenserwartung Getriebe aus Lastkollektiven',
      connector: 'https://knowledge.int.pdm-cloud-connector.com/provider/edc-control-plane/BPNL00000003COJN',
      category: 'Prognosis',
      type: 'Skill',
      contract: '82e4fe96-eb9f-4a18-863c-386f1fbe04da:319138e8-985c-498f-be6d-e109c860af04',
      agreement: true,
      offerer: 'Catena-X'
    },
    { id: 'urn:graph:bmw:material',
      name: 'Materialien Graph',
      connector: 'https://knowledge.int.pdm-cloud-connector.com/provider/edc-control-plane/BPNL00000003CPIY',
      category: 'Overview',
      type: 'Graph',
      contract: '82e4fe96-eb9f-4a18-863c-386f1fbe04da:319138e8-985c-498f-be6d-e109c860af04',
      agreement: false,
      offerer: 'Mercedes'
    },
  ];


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 3 },
    { field: 'name', headerName: 'Name', flex: 3 },
    { field: 'connector', headerName: 'Service/Connector', flex: 3 },
    { field: 'offerer', headerName: 'Offerer', flex: 2 },
    { field: 'category', headerName: 'Category', flex: 2 },
    { field: 'type', headerName: 'Type', flex: 2 },
    { field: 'contract', headerName: 'Contract', flex: 3},
    { field: 'agreement', headerName: 'Agreement', flex: 1, type: 'boolean'},
  ];
  return (
    <Table
      rowCount={rows.length}
      title="Asset List"
      toolbar={{onSearch: (input) => console.log(input)}}
      disableSelectionOnClick={true}
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      disableDensitySelector={true}
      rows={rows}
      columns={columns}
    />
  );
}

export default AssetList;