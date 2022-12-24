import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Pagination from './Pagination';
import axios from 'axios';


export default function UserDetails() {
  const url= import.meta.env.VITE_APP_BACKEND_URL;
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(5);
  const [data,setData]= React.useState([]);
  const [filter,setFilter]= React.useState("");
  React.useEffect(() => {
  axios.get(`${url}/users?page=${page}&limit=10&filterby=${filter}`)
  .then((res)=>{
    console.log(res);
    setData(res.data);
  })
  .catch((err)=>{
    console.log(err);
  })
  }, [page,filter])
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            User Details
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <br />
        <Typography variant="p" color="inherit" noWrap>
           Filter Users by Gender: <span></span>
           <select onChange={(e)=>setFilter(e.target.value)}>
            <option value="">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
           </select>
          </Typography>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <table>
                <tr style={{border:"1px solid black"}}>
                    <td style={{border:"1px solid black"}}>ID</td>
                    <td style={{border:"1px solid black"}}>Name</td>
                    <td style={{border:"1px solid black"}}>Date of Birth</td>
                    <td style={{border:"1px solid black"}}>Gender</td>
                    <td style={{border:"1px solid black"}}>Email</td>
                    <td style={{border:"1px solid black"}}>Username</td>
                    <td style={{border:"1px solid black"}}>Password</td>
                    <td style={{border:"1px solid black"}}>Phone No.</td>
                    <td style={{border:"1px solid black"}}>Profile PIcture</td>
                </tr>
                {data && data.map((el)=>
                  <tr key={el.id} style={{border:"1px solid black"}}>
                  <td style={{border:"1px solid black"}}>{el.id}</td>
                  <td style={{border:"1px solid black"}}>{el.name}</td>
                  <td style={{border:"1px solid black"}}>{el.dob}</td>
                  <td style={{border:"1px solid black"}}>{el.gender}</td>
                  <td style={{border:"1px solid black"}}>{el.email}</td>
                  <td style={{border:"1px solid black"}}>{el.username}</td>
                  <td style={{border:"1px solid black"}}>{el.password}</td>
                  <td style={{border:"1px solid black"}}>{el.phone}</td>
                  <td style={{border:"1px solid black"}}><img src={el.profilepic} alt={el.profilepic}/></td>
                </tr>
                )}
            </table>

          </Container>
          <Container maxWidth="sm">
            <br />
          <Stack direction="row" spacing={2}>
          <Button variant="outlined" disabled={page===1} onClick={()=>setPage(page-1)}>
            Prev
          </Button>
          <Pagination totalPages={total} currentPage={page} handlePageChange={setPage}/>
          <Button variant="contained" disabled={page===5} onClick={()=>setPage(page+1)}>
            Next
          </Button>
        </Stack>
          </Container>
        </Box>
      </main>

      </div>
     
  );
}