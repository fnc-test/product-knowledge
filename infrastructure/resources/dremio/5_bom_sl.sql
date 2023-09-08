DROP TABLE $scratch.CX_TRC_SingleLevelBomAsPlanned;
CREATE TABLE $scratch.CX_TRC_SingleLevelBomAsPlanned AS (
       SELECT
           SUBSTR(CHILDREN.catenaXId,10) as catenaXId,
           CAST(CHILDREN.child['quantity'].quantityNumber AS DOUBLE) as quantity_number,
           SUBSTR(CHILDREN.child['quantity'].measurementUnit,6) as quantity_unit,
           TO_DATE(LEFT(CHILDREN.child['validityPeriod'].validFrom,10),'YYYY-MM-DD') as validityPeriod_validFrom,
           TO_DATE(LEFT(CHILDREN.child['validityPeriod'].validTo,10),'YYYY-MM-DD') as validityPeriod_validTo,
           TO_DATE(LEFT(CHILDREN.child['lastModifiedOn'],10),'YYYY-MM-DD') as last_modified_on,
           TO_DATE(LEFT(CHILDREN.child['createdOn'],10),'YYYY-MM-DD') as created_on,
           CHILDREN.child.businessPartner as supplier,
           SUBSTR(CHILDREN.child['catenaXId'],10) as childCatenaXId
        FROM (
            SELECT
                JSON.catenaXId,
                FLATTEN(JSON.json['childItems']) AS child
             FROM (
                SELECT
                    catenaXId,
                    FLATTEN("urn:bamm:io.catenax.single_level_bom_as_planned:2.0.0#SingleLevelBomAsPlanned") AS json
                 FROM datalake."catenax-knowledge-agents"."CX_Testdata_v1.5.2-SNAPSHOT-AsPlanned.ndjson"
             ) JSON
             WHERE JSON.json IS NOT NULL) CHILDREN
    );

DROP VIEW "TRACE_TEST_OEM".CX_TRC_SingleLevelBomAsPlanned;
CREATE VIEW "TRACE_TEST_OEM".CX_TRC_SingleLevelBomAsPlanned AS
SELECT
  catenaXId,
  quantity_number,
  quantity_unit,
  validityPeriod_validFrom,
  validityPeriod_validTo,
  'as-planned' as lifecycle_context,
  created_on,
  last_modified_on,
  supplier,
  childCatenaXId
 FROM $scratch.CX_TRC_SingleLevelBomAsPlanned;

 DROP TABLE $scratch.CX_TRC_SingleLevelUsageAsPlanned;
CREATE TABLE $scratch.CX_TRC_SingleLevelUsageAsPlanned AS (
       SELECT
           SUBSTR(PARENTS.catenaXId,10) as catenaXId,
           CAST(PARENTS.parent['quantity'].quantityNumber AS DOUBLE) as quantity_number,
           SUBSTR(PARENTS.parent['quantity'].measurementUnit,6) as quantity_unit,
           TO_DATE(LEFT(PARENTS.parent['validityPeriod'].validFrom,10),'YYYY-MM-DD') as validityPeriod_validFrom,
           TO_DATE(LEFT(PARENTS.parent['validityPeriod'].validTo,10),'YYYY-MM-DD') as validityPeriod_validTo,
           TO_DATE(LEFT(PARENTS.parent['createdOn'],10),'YYYY-MM-DD') as created_on,
           TO_DATE(LEFT(PARENTS.parent['lastModifiedOn'],10),'YYYY-MM-DD') as last_modified_on,
           SUBSTR(PARENTS.parent['parentCatenaXId'],10) as parentCatenaXId
        FROM (
            SELECT
                JSON.catenaXId,
                FLATTEN(JSON.json['parentParts']) AS parent
             FROM (
                SELECT
                    catenaXId,
                    FLATTEN("urn:bamm:io.catenax.single_level_usage_as_planned:1.1.0#SingleLevelUsageAsPlanned") AS json
                 FROM datalake."catenax-knowledge-agents"."CX_Testdata_v1.5.2-SNAPSHOT-AsPlanned.ndjson"
             ) JSON
             WHERE JSON.json IS NOT NULL) PARENTS
    );

DROP VIEW "TRACE_TEST_OEM".CX_TRC_SingleLevelUsageAsPlanned;
CREATE VIEW "TRACE_TEST_OEM".CX_TRC_SingleLevelUsageAsPlanned AS
SELECT
  catenaXId,
  quantity_number,
  quantity_unit,
  validityPeriod_validFrom,
  validityPeriod_validTo,
  'as-planned' as lifecycle_context,
  created_on,
  last_modified_on,
  parentCatenaXId
 FROM $scratch.CX_TRC_SingleLevelUsageAsPlanned;