import React, { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextField from '@mui/material/TextField';
import OneContact from './OneContact';
import { Typography } from '@mui/material';


function RightPanel(props: any) {

    const debounce = (func: any) => {
        let timer: any;
        return function (...args: any) {
            const context = typeof globalThis;
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 500)
        }
    }

    const handleSearchInput = (event: any) => {
        props.setSearched(event.target.value)
    }

    const optimisedVersion = useCallback(debounce(handleSearchInput), [])

    return (
        <div style={{}}>

            <TextField id="outlined-search" style={{ width: '80%' }}
                label="Search Contacts"
                type="search" onChange={optimisedVersion} />


            <InfiniteScroll
                dataLength={props.contacts.length}
                next={props.fetchMoreData}
                hasMore={props.nextPage}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <Typography style={{ textAlign: 'center', marginTop: '10px' }}>
                        All Contacts Shown
                    </Typography>
                }
            >
                {props.contacts.map((contact: any) =>
                    <OneContact key={contact.id} contact={contact} />
                )}

            </InfiniteScroll>


        </div>
    );
}

export default RightPanel;