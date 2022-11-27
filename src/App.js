import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setsearchValue] = React.useState('');
  const [invites, setInvites] = React.useState([]);
  const [Issuccess, setIssuccess] = React.useState(false);


  const onChangesearchValue = (event) => {
    setsearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id))
    } else {
      setInvites((prev) => [...prev, id])
    }
  }

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json.data)
      }).catch(err => {
        console.warn(err);
        alert('Ошибка получения пользователей')
      }).finally(() => setLoading(false))
  }, [])
  return (
    <div className="App">
      {Issuccess ? <Success setIssuccess={setIssuccess} count={invites.length} /> : (<Users
        onChangesearchValue={onChangesearchValue}
        items={users}
        isLoading={isLoading}
        searchValue={searchValue}
        onClickInvite={onClickInvite}
        invites={invites}
        setIssuccess={setIssuccess} />)}

    </div>
  );
}

export default App;
