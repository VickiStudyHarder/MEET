import React, {useState, useEffect, useContext } from 'react';
import Box  from '@mui/material/Box'
import Status from '../pages/auth/Status'
import Button from '@mui/material/Button'
import axios from "axios";
import { AccountContext } from './auth/Account'

const Home = () => {
   const [result, setResult] = useState("TEST")

   const { getSession } = useContext(AccountContext)

   const  onClick = () => {
      console.log("OnClick")
      getSession().then(async (headers:any) => {
         console.log({headers})
         const result =  await axios.get(`https://8fhpyuj8ij.execute-api.ap-southeast-2.amazonaws.com/development/endpoint2`, {headers});
         console.log({result})
         //setResult(result)
      })
   }

   useEffect(() => {

   }, [result])

   return (
      <Box m={2} >
         <Status />
         <h2>Home</h2>
         <p>{result}</p>
         <Button variant="contained" onClick={onClick}>GET Request</Button>
      </Box>
      );
}

export default Home;