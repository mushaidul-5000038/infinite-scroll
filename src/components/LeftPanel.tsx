import React, { useEffect, useState } from 'react';
import ExcludeTag from './ExcludeTag';
import IncludeTag from './IncludeTag';
import axios from 'axios';
import qs from 'qs';
import { TextField } from '@mui/material';


function LeftPanel(props: any) {

    // useEffect(() => {

    //     if (props.included.length || props.excluded.length) {

    //         //let result = value.map((val) => val.title)

    //         const config = {

    //             params: {
    //                 tags: props.included,
    //                 notTags: props.excluded
    //             },
    //             paramsSerializer: (params: any) => {
    //                 return qs.stringify(params, { arrayFormat: "repeat" })
    //             },
    //             headers: { Authorization: `Bearer ${props.token}` }
    //         };

    //         if (props.token) {
    //             axios.get("https://api-im.chatdaddy.tech/contacts", config).then((response) => {
    //                 if (response.status === 200) {
    //                     console.log(response.data, 'included and excluded')
    //                     props.setContacts(response.data.contacts)

    //                     props.setNextPage(response.data.nextPage)
    //                 } else {
    //                     console.log("error at get");
    //                 }
    //             });
    //         }

    //     }
    //     else {
    //         if (props.token) {
    //             props.getAllContacts()
    //         }

    //     }
    // }, [props.included, props.excluded, props.token])

    return (
        <div>
            <IncludeTag token={props.token} setContacts={props.setContacts} setIncluded={props.setIncluded} />
            <ExcludeTag token={props.token} setExcluded={props.setExcluded} />

            <div>
                <h4>Message Received</h4>
                <TextField
                    id="outlined-number"
                    label="Min"
                    type="number"
                    onChange={(e) => props.setMinRec(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="Max"
                    type="number"
                    onChange={(e) => props.setMaxRec(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            <div>
                <h4>Message Sent</h4>
                <TextField
                    id="outlined-number"
                    label="Min"
                    type="number"
                    onChange={(e) => props.setMinSen(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="Max"
                    type="number"
                    onChange={(e) => props.setMaxSen(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>



        </div>
    );
}

export default LeftPanel;