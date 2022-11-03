import React from 'react'
import { Select as MuiSelect, SelectProps, InputLabel, FormHelperText, FormControl } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

type Props = SelectProps & {
  options: { value: any; name: string }[]
  helperText?: string
}

const Select = ({ options = [], helperText, ...props }: Props) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id='test-select-label'>{props.label}</InputLabel>
      <MuiSelect {...props} fullWidth labelId='test-select-label'>
        {options.map((option: any, index) => (
          <MenuItem value={option.value} key={index}>
            {option.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {props.error && <FormHelperText sx={{ color: 'error.main' }}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Select
