import React, { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


function ExcludeTag(props: any) {

  function handleExclude(value: any) {
    let result = value.map((val: any) => val.title)
    props.setExcluded(result)
  }

  return (
    <div>
      <Autocomplete
        multiple
        style={{ width: '200px' }}
        id="tags-standard"
        options={tags}
        getOptionLabel={(option) => option.title}
        onChange={(event, value) => handleExclude(value)}

        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Excluded Tags"
            placeholder="excluded"
          />
        )}
      />
    </div>
  );
}

export default ExcludeTag;

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