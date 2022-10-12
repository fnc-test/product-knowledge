import { Box, Paper, Chip } from "@mui/material";
import { Input, Typography } from "cx-portal-shared-components";
import { useState } from "react";

interface ChipData {
  key: number;
  label: string;
}

export default function CustomSearch(){
  const [searchVin, setSearchVin] = useState<string>('')
  const [keywordInput, setKeywordInput] = useState<string>('')
  const [errorVin, setErrorVin] = useState<boolean>(false)
  const [chipData, setChipData] = useState<ChipData[]>([]);

  const onVinSearchChange = (value: string) => {
    console.log(value);
    const validateExpr = /^[ A-Za-z]*$/.test(value)
    if (!validateExpr) {
      setErrorVin(true)
      return
    }
    setSearchVin(value)
  }

  const onChipDelete = (deleteChip: ChipData) => {
    console.log(deleteChip)
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

  return(
    <>
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="h4"
        className="section-title"
      >
        Custom Search
      </Typography>
      <Paper elevation={3} sx={{padding: 3, maxWidth: '500px', margin: '32px auto'}}>
        <Input
          error={errorVin}
          helperText="The entered VIN does not match a VIN format."
          value={searchVin}
          onChange={(e) => onVinSearchChange(e.target.value)}
          placeholder="VIN"
        />
        <Box mt={3} mb={3}>
          <Box mb={3}>
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
      </Paper>
    </>
  )
}