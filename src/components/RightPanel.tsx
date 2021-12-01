import React, { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextField from '@mui/material/TextField';


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
        <div>

            <TextField id="outlined-search" label="Search field" type="search" onChange={optimisedVersion} />


            <InfiniteScroll
                dataLength={props.contacts.length}
                next={props.fetchMoreData}
                hasMore={props.nextPage}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {props.contacts.map((contact: any) =>
                    <div key={contact.id}>{contact.name}</div>
                )}

            </InfiniteScroll>


        </div>
    );
}

export default RightPanel;