import './App.css';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import moment from 'moment';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from './logoH.png';

// "name": "string",
// "email": "string",
// "birth_date": "2023-01-19T18:50:23.128Z",
// "cpf": "string",
// "zip_code": "string"
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const usersMock = [
  {
    name: 'Danillo Lima',
    cpf: '40810273328',
    email: 'danillo@gmail.com'
  },
  {
    name: 'Elisandro',
    cpf: '40810273328',
    email: 'eli@gmail.com'
  }
]

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState();
  const [cpf, setCpf] = useState('');
  const [err, setErr] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {list()}, [])
  
  const clearData = () => {
    setName('');
    setEmail('');
    setCpf('');
    setErr('');
    setBirthDate();
  }
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const insert = () => {
    const body = {
      name,
      email,
      cpf,
      birth_date: moment(),
      zip_code: '',
    }

    console.log(body);

    setLoading(true);
    fetch('https://heropu-usuario-api.azurewebsites.net/client/create', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    }).then(_ => {
      clearData();
      list();
    })
    .catch(e => setErr(e))
    .finally(_ => setLoading(false))
  }

  const deleteUser = (id) => {
    setLoading(true);
    fetch(`https://heropu-usuario-api.azurewebsites.net/client/${id}`, {
      method: 'DELETE',
      headers: myHeaders
    }).then(_ => {
      list();
    })
    .catch(e => setErr(e))
    .finally(_ => setLoading(false))
  }

  const list = () => {
    fetch('https://heropu-usuario-api.azurewebsites.net/Client/list', {
      method: 'GET',
      headers: myHeaders
    }).then(r => console.log(r.json().then(r => setUsers(r))))
  }

  return (
    <div className="App">
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={logo} alt="logo" width={135}/>
        <h3>HerupoPET - Controle de cadastros</h3>
      </div>
      <div className="Home-form">
        {err && (<p>Erro: {{err}}</p>)}
        <TextField id="inp-nome" label="Nome" name="Nome" variant="outlined" value={name} onChange={e => setName(e.target.value)} style={{marginRight: 10}}/>
        <TextField id="inp-cpf" label="Cpf" name="Cpf" variant="outlined" value={cpf} onChange={e => setCpf(e.target.value)} style={{marginRight: 10}}/>
        <TextField id="inp-email" label="Email" name="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} style={{marginRight: 10}}/>
        <LoadingButton name="Cadastro" onClick={() => insert()} variant="outlined" loading={loading}>Cadastrar</LoadingButton>
        
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" id="tb-dados" name="Dados">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell >Email</TableCell>
              <TableCell align="right">Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell >{row.email}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete" color="primary" name={row.name} onClick={() => deleteUser(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
    </div>
  );
}

export default Home;
