import { OntologyHub, getSkillBackend } from '@catenax-ng/skill-modules';
import { useState } from 'react';
import { Box } from "@mui/material";

export default function Vocabulary() {
  const [selectedOntology, setSelectedOntology] = useState<string>('')

  return (
    <Box mt={4}>
      {selectedOntology.length > 0 &&
        <Box mb={2}>
          <iframe title="WebVowl" width="100%" height={500} src={`${getSkillBackend()}#url=${selectedOntology}`} />
        </Box>
      }
      <OntologyHub onOntologySelect={setSelectedOntology} />
    </Box>
  );
}
