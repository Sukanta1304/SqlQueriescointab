import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const url= import.meta.env.VITE_APP_BACKEND_URL;
    const [state, setState] = React.useState([]);
    const [flag,setFlag] = React.useState(true);
    const storeData=[];
    // React.useEffect(() => {
    //   setFlag(false);
    //   console.log(flag)
    // axios.get(`https://randomuser.me/api/?results=50`)
    // .then((res)=>{
    //     // console.log(res);
    //     setState(res.data.results);
    //     setFlag(true);
    //   console.log(flag)
    // })
    // .catch((err)=>{
    //   console.log(flag)
    // })
    // }, []);

  const throttle=(fn)=>{
      return function(){
          if(flag){
              fn();
          }
      }
  }

  const getData=()=>{
    setFlag(false);
    console.log(flag)
  axios.get(`https://randomuser.me/api/?results=50`)
  .then((res)=>{
      // console.log(res);
      setState(res.data.results);
      setFlag(true);
    console.log(flag)
  })
  .catch((err)=>{
    console.log(flag)
  })
  }
  



    // console.log(state);

    const deletUsers=()=>{
      let text = "Are Your Sure You want to delete all Users?";
      if (confirm(text) == true) {
        axios.delete(`${url}/users/removeall`)
        .then((res)=>{
          alert("All users Deleted Successfuly")
        })
        .catch((err)=>{
          console.log("Something went wrong")
        })
      } else {
        console.log("You pressed cancel")
      }
    }

    React.useEffect(() => {
    state.map((el)=>{
      const {name,dob,gender,email,login,phone,picture}=el;
      const crname= name.title+" "+ name.first+" "+ name.last
      storeData.push({name:crname,dob:dob.date,gender,email,username:login.username,
                      password:login.password,phone,profilepic:picture.medium});
    });
    console.log(storeData);
    }, [state])

    

  return (
    <div>
       <Stack spacing={2} direction="row">
      <Button variant="contained"
      onClick={throttle(getData)}
      >Fetch Users</Button>
      <Button variant="outlined" color="error"
      onClick={()=>deletUsers()}
      >Delete Users</Button>
      <Link to="/userdetails">
      <Button variant="outlined">User Details</Button>
      </Link>
      
    </Stack>
    {/* <div>
      <table>
        <th>
          <tr>
          <td style={{border:"1px solid black"}}>Sl. No</td>
          <td style={{border:"1px solid black"}}>Name</td>
          <td style={{border:"1px solid black"}}>Date of Birth/Age</td>
          <td style={{border:"1px solid black"}}>Gender</td>
          <td style={{border:"1px solid black"}}>Address</td>
          <td style={{border:"1px solid black"}}>Email</td>
          <td style={{border:"1px solid black"}}>UserName</td>
          <td style={{border:"1px solid black"}}>Password</td>
          <td style={{border:"1px solid black"}}>Phone</td>
          <td style={{border:"1px solid black"}}>Profilepic</td>
          </tr>
        </th>
      </table>
      {state && state.map((el,i)=>
      <tr key={i+1} style={{border:"1px solid black"}}>
          <td style={{border:"1px solid black"}}>{i+1}</td>
          <td style={{border:"1px solid black"}}>{`${el?.name?.title} ${el?.name?.first} ${el?.name?.last}`}</td>
          <td style={{border:"1px solid black"}}>{`${el?.dob?.date?.split("T")[0]} / ${el?.dob?.age}`}</td>
          <td style={{border:"1px solid black"}}>{el.gender}</td>
          <td style={{border:"1px solid black"}}>Address</td>
          <td style={{border:"1px solid black"}}>{el.email}</td>
          <td style={{border:"1px solid black"}}>{el?.login?.username}</td>
          <td style={{border:"1px solid black"}}>{el?.login?.username}</td>
          <td style={{border:"1px solid black"}}>{el?.phone}</td>
          <td style={{border:"1px solid black"}}>{el?.picture?.medium}</td>
      </tr>
      )}
    </div> */}
    </div>
    
  );
}