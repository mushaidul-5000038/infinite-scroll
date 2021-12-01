import React, { useEffect, useState } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import styled from 'styled-components';
import axios from "axios";
import qs from 'qs';
import { Search } from '@mui/icons-material';
const StyledDiv = styled.div`
  display: flex;
  justify-content:space-around;
`;



function App() {
  const [contacts, setContacts] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [included, setIncluded] = useState([])
  const [excluded, setExcluded] = useState([])
  const [searched, setSearched] = useState([])

  const [token, setToken] = useState('')

  const fetchMoreData = () => {
    const config = {
      params: {
        page: nextPage,
        tags: included,
        notTags: excluded,
        q: searched,
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
  }, [token, searched, excluded, included])

  return (
    <div className="App">
      <StyledDiv>
        <LeftPanel token={token} setContacts={setContacts} setNextPage={setNextPage} getAllContacts={() => getAllContacts()} included={included} setIncluded={setIncluded} excluded={excluded} setExcluded={setExcluded} />
        <RightPanel contacts={contacts} nextPage={nextPage} fetchMoreData={fetchMoreData} setSearched={setSearched} />
      </StyledDiv>


    </div>
  );
}

export default App;
