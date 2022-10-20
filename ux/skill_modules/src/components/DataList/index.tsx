import { BindingSet } from "@knowledge-agents-ux/skill_framework/dist/src";
import { Table } from "cx-portal-shared-components";
import React from "react";

export const DataList = ({vin, data}: {vin: String, data: BindingSet}) => {
  const tableTitle = `Results for ${vin}`
  /* const resultToColumns = (result: string[]): Array<GridColDef> =>
    result.map(item => ({
      field: item,
      flex: 2
    }))

  const resultToRows = (result: Entry[]) =>
    result.map(item => {
      console.log(item)
      return item.value
    })
   */

  return(
    <>
      <Table title={tableTitle} columns={[]} rows={[]}      
      />
      {
        data.results.bindings.map((value, i) => {
          console.log(value);
          return <div key={`${value.vin}_${i}`}>
            <p><b>Vin:</b><span>{value.vin.value ? value.vin.value : 'No Value'}</span></p>
            <p><b>Code Number:</b><span>{value.codeNumber.value ? value.codeNumber.value : 'No Value'}</span></p>
            <p><b>Description:</b><span>{value.description.value ? value.description.value : 'No Value'}</span></p>
            <p><b>Version:</b><span>{value.version.value ? value.version.value : 'No Value'}</span></p>
          </div>
        })
      }
    </>

  )
}