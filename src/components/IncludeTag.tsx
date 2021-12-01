import React, { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
//import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import axios from "axios";
import qs from 'qs'


function IncludeTag(props: any) {

  function handleInclude(value: any) {

    let result = value.map((val: any) => val.title)
    props.setIncluded(result)
  }

  return (
    <div style={{ marginBottom: '20px', marginTop: '30px' }}>
      <Autocomplete
        style={{ width: '200px' }}
        multiple
        id="tags-standard"
        options={tags}
        getOptionLabel={(option) => option.title}
        onChange={(event, value) => handleInclude(value)}

        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Include Tags"
            placeholder="included"
          />
        )}
      />
    </div>
  );
}

export default IncludeTag;

const tags = [
  { title: 'Home' },
  { title: 'Office' },
  { title: 'Beast' },
  { title: 'School' },
  { title: 'Harry' },
  { title: 'VIP' },
  { title: 'Color' },
  { title: 'developer' }
]