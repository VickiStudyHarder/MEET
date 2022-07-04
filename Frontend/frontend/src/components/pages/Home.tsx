import React, {useState, useEffect, useContext } from 'react';
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from "axios";
import { AccountContext } from '../../contexts/Account'

const Home = () => {
   const [result, setResult] = useState("TEST")

   const { getSession } = useContext(AccountContext)

   const  onClick = () => {
      console.log("OnClick")
      getSession().then(async (data:any) => {
         axios.get(`https://8fhpyuj8ij.execute-api.ap-southeast-2.amazonaws.com/development/endpoint2`, {headers: data.headers}).then((response) => {
            setResult(response.data.message)
         });
      })
   }

   useEffect(() => {

   }, [result])

   return (
      <Box m={2} >
         <h2>Home</h2>
         <p>{result}</p>
         <Button variant="contained" onClick={onClick}>GET Request</Button>
      </Box>
      );
}

export default Home;