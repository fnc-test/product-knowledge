import { AssetView, OntologyHub, OntologyHubService } from '@catenax-ng/skill-modules';
import { useState } from 'react';

export default function SkillGym() {
  const [selectedOntology, setSelectedOntology] = useState<string>('')
  const hub = OntologyHubService;
  hub().then(data => console.log(data))
  return (
    <>
      <AssetView />
      {/* <OntologyView dataUrl={jsonUrl} /> */}
      <OntologyHub onOntologySelect={setSelectedOntology} />
      {selectedOntology.length > 0 &&
        <iframe title="WebVowl" width="100%" height={700} src={`https://service.tib.eu/webvowl/#url=${selectedOntology}`} />
      }
    </>
  );
}
