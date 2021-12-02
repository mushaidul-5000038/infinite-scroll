import React, { useEffect, useState } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import axios from "axios";
import qs from 'qs';
import { Button, Container, Grid, IconButton, Modal, useMediaQuery } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';



function App() {
  const [contacts, setContacts] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [included, setIncluded] = useState([])
  const [excluded, setExcluded] = useState([])
  const [searched, setSearched] = useState([])
  const [minRec, setMinRec] = useState(0)
  const [maxRec, setMaxRec] = useState(0)
  const [minSen, setMinSen] = useState(0)
  const [maxSen, setMaxSen] = useState(0)


  const [token, setToken] = useState('')

  const fetchMoreData = () => {
    const config = {
      params: {
        page: nextPage,
        tags: included,
        notTags: excluded,
        q: searched,
        minMessagesSent: minSen,
        minMessagesRecv: minRec,
        maxMessagesSent: maxSen,
        maxMessagesRecv: maxRec,
      },
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: "repeat" })
      },
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get("https://api-im.chatdaddy.tech/contacts", config).then((response) => {
      if (response.status === 200) {
        setContacts(contacts.concat(response.data.contacts))
        // response.data.contacts.filter((cont: any) => console.log(cont.tags))
        console.log(response.data, 'scrolled')
        setNextPage(response.data.nextPage)

      } else {
        console.log("error at get");
      }
    });
  }

  useEffect(() => {
    //get access token
    axios.post("https://api-teams.chatdaddy.tech/token", {
      refreshToken: '059c420e-7424-431f-b23b-af0ecabfe7b8',
      teamId: 'a001994b-918b-4939-8518-3377732e4e88'
    }).then((response) => {
      if (response.status === 200) {
        setToken(response.data.access_token)
      } else {
        console.log("error at get");
      }
    });

  }, [])

  function getAllContacts() {
    const config = {
      params: {
        tags: included,
        notTags: excluded,
        q: searched,
        minMessagesSent: minSen,
        minMessagesRecv: minRec,
        maxMessagesSent: maxSen,
        maxMessagesRecv: maxRec,
      },
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: "repeat" })
      },
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get("https://api-im.chatdaddy.tech/contacts", config).then((response) => {
      if (response.status === 200) {
        setContacts(response.data.contacts)

        setNextPage(response.data.nextPage)
        console.log(response.data)
      } else {
        console.log("error at get");
      }
    });
  }

  useEffect(() => {
    if (token) {
      getAllContacts()
    }
  }, [token,
    searched,
    excluded,
    included,
    minRec,
    maxRec,
    minSen,
    maxSen])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const matches = useMediaQuery('(min-width:900px)');

  return (
    <div className="App">
      <Container
        maxWidth='lg'
        style={{ padding: '22px', overflow: 'hidden' }}
      >
        <Grid container spacing={2}>
          {matches &&
            <Grid item xs={8} md={6} lg={4}>
              <LeftPanel token={token}
                setContacts={setContacts}
                setNextPage={setNextPage}
                getAllContacts={() => getAllContacts()}
                included={included}
                setIncluded={setIncluded}
                excluded={excluded}
                setExcluded={setExcluded}
                setMinRec={setMinRec}
                setMaxRec={setMaxRec}
                setMinSen={setMinSen}
                setMaxSen={setMaxSen}
              />
            </Grid>}

          <Grid item xs={12} md={6} lg={8}>
            {!matches && <IconButton onClick={handleOpen}>
              <FilterAltIcon />
            </IconButton>}
            <RightPanel contacts={contacts} nextPage={nextPage} fetchMoreData={fetchMoreData} setSearched={setSearched} />
          </Grid>

        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-describedby="modal-modal-description"
        >
          <LeftPanel token={token}
            setContacts={setContacts}
            setNextPage={setNextPage}
            getAllContacts={() => getAllContacts()}
            included={included}
            setIncluded={setIncluded}
            excluded={excluded}
            setExcluded={setExcluded}
            setMinRec={setMinRec}
            setMaxRec={setMaxRec}
            setMinSen={setMinSen}
            setMaxSen={setMaxSen}
          />

        </Modal>
      </Container>


    </div>
  );
}

export default App;
