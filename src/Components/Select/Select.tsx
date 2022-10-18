import React from 'react'
import { Select as MuiSelect, SelectProps, Box, FormHelperText } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

type Props = SelectProps & {
  options: { value: any; name: string }[]
}

const Select = ({ options = [], ...props }: Props) => {
  return (
    <Box>
      <MuiSelect {...props}>
        {options.map((option: any) => (
          <MenuItem value={option.value}>{option.name}</MenuItem>
        ))}
      </MuiSelect>
      {props.error && <FormHelperText>{props.error}</FormHelperText>}
    </Box>
  )
}

export default Select
