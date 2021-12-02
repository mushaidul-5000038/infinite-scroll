import { Avatar, Checkbox, Divider, Typography } from '@mui/material';
import React from 'react';
import { indigo, cyan, lightBlue } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function OneContact(props: any) {


    return (
        <>
            <div style={{ padding: '5px', marginTop: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox {...label} />
                <Avatar sx={{
                    bgcolor:
                        (props.contact.id > 10165742 ? lightBlue[300] :
                            props.contact.id > 10164109 ? indigo[300] :
                                cyan[300])
                }}>
                    {props.contact.name[0]}
                </Avatar>

                <div style={{ marginLeft: '10px' }}>
                    <Typography variant='h6' style={{ fontSize: '1.1rem' }}>{props.contact.name}</Typography>
                    <Typography variant='subtitle2'>{props.contact.phoneNumber}</Typography>
                </div>



            </div>
            <Divider />
        </>
    );
}

export default OneContact;