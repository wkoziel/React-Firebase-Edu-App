import React from 'react'
import { Input, Select as MuiSelect, SelectProps } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

type Props = SelectProps & {
  options: { value: any; name: string }[]
}

const Select = ({ options = [], ...props }: Props) => {
  return (
    <MuiSelect
      {...props}
      input={
        <Input
          sx={{ border: '1px solid lightGray', padding: '10px', borderRadius: 1 }}
          placeholder={props.placeholder}
          name={props.name}
          fullWidth
        />
      }
    >
      {options.map((option: any) => (
        <MenuItem value={option.value}>{option.name}</MenuItem>
      ))}
    </MuiSelect>
  )
}

export default Select
