import {
  getOntologyHubFactory,
  OntologyResult,
} from '@catenax-ng/skill-framework/dist/src';

export function OntologieHub(): Promise<OntologyResult[]> {
  const ontologyHub = getOntologyHubFactory().create();
  return ontologyHub.getOntologies();
}
