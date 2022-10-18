import { Box, Paper, Chip, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import { Button, Input, Typography } from "cx-portal-shared-components";
import { useEffect, useState } from "react";
import {BindingSet, getConnectorFactory} from '@knowledge-agents-ux/skill_framework/dist/src'
import React from "react";

interface ChipData {
  key: number;
  label: string;
}

const defaultSkills = [
  {
    title: 'Trouble Code Search',
    value: 'TroubleCodeSearch'
  },
  {
    title: 'Example Skill',
    value: 'example'
  }
]

interface CustomSearchProps{
  onSearchResult: (result: BindingSet) => void
}

export const CustomSearch = ({onSearchResult}: CustomSearchProps) => {
  const [selectedSkill, setSelectedSkill] = useState<string>('')
  const [skillList, setSkillList] = useState<any[]>(defaultSkills)
  const [searchVin, setSearchVin] = useState<string>('')
  const [keywordInput, setKeywordInput] = useState<string>('')
  const [errorVin, setErrorVin] = useState<boolean>(false)
  const [chipData, setChipData] = useState<ChipData[]>([]);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const onVinSearchChange = (value: string) => {
    setSearchVin(value)
  }

  const onChipDelete = (deleteChip: ChipData) => {
    setChipData((chips) => chips.filter((chip) => chip.key !== deleteChip.key));
  }

  const onKeywordInputChange = (value: string) => {
    if(value.includes(' ')){
      const newChip = {key: chipData.length, label: value.trim()}
      setChipData(prevState => ([...prevState, newChip]))
      setKeywordInput('')
    } else {
      setKeywordInput(value);
    }
  }
  const hasNoValue = (item: any) => item.length === 0

  useEffect(() => {
    const isDisabled = hasNoValue(selectedSkill) || hasNoValue(searchVin) || (hasNoValue(chipData) && hasNoValue(keywordInput));
    setDisableButton(isDisabled)
  }, [selectedSkill, searchVin, chipData, keywordInput])

  const onSearch = () => {
    let queryVars;
    if(hasNoValue(chipData)){
      queryVars = {vin: searchVin, problemArea: keywordInput, minVersion: 1}
    } else {
      queryVars = chipData.map(keyword => ({vin: searchVin, problemArea: keyword.label, minVersion: 1}))
    }
    console.log(queryVars)
    const connector = getConnectorFactory().create();
    connector.execute(selectedSkill, queryVars)
      .then(result => {
        console.log(result);
        onSearchResult(result);
      });
  }

  return(
    <Paper elevation={3} sx={{padding: 3}}>
      <FormControl fullWidth sx={{mb: 3}}>
        <InputLabel id="skill-select-label">Select a skill</InputLabel>
        <Select
          labelId="skill-select-label"
          id="skill-select"
          value={selectedSkill}
          label="Select a skill"
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          {skillList.map(skill =>
            <MenuItem key={skill.value} value={skill.value}>{skill.title}</MenuItem>
          )}
        </Select>
      </FormControl>
      {selectedSkill &&
        <>
          <Input
            error={errorVin}
            helperText="The entered VIN does not match a VIN format."
            value={searchVin}
            onChange={(e) => onVinSearchChange(e.target.value)}
            placeholder="VIN"
          />
          <Box mt={2} mb={3}>
            <Box mb={2}>
              {chipData.map((data) => {
                return (
                  <Chip
                    color="primary"
                    key={data.key}
                    label={data.label}
                    onDelete={() => onChipDelete(data)}
                    clickable={true}
                  />
                );
              })}
            </Box>
            <Input
              value={keywordInput}
              onChange={(e) => onKeywordInputChange(e.target.value)}
              placeholder="Enter a key word"
            />
          </Box>
          <Button disabled={disableButton} fullWidth onClick={onSearch}>Search Data</Button>
        </>
      }
    </Paper>
  )
}