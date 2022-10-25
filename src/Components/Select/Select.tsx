import React from 'react'
import { Select as MuiSelect, SelectProps, InputLabel, FormHelperText, FormControl } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

type Props = SelectProps & {
  options: { value: any; name: string }[]
}

const Select = ({ options = [], ...props }: Props) => {
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
      {props.error && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

// <Box>
//   <MuiSelect {...props}>
//     {options.map((option: any, index) => (
//       <MenuItem value={option.value} key={index}>
//         {option.name}
//       </MenuItem>
//     ))}
//   </MuiSelect>
//   {props.error && <FormHelperText>{props.error}</FormHelperText>}
// </Box>

export default Select
