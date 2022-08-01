import { Logout } from "@mui/icons-material";
import * as React from "react";

export interface IBrandProps {}

export default function Brand(props: IBrandProps) {
  const logoUrl =
    "./brand.svg";
  return (
    <div style={{position:'relative',width:164,height:48}}>
      <img src={logoUrl} style={{ width: 128, height: 48 ,position:'absolute',left:0,top:0}} alt=""/>
      {/* <div style={{position:'absolute',left:60,top:0,fontSize:20,height:'26px'}}>MEET</div>
      <div style={{position:'absolute',left:60,bottom:0,fontSize:12,height:'18px'}}>IS ALL YOU NEED</div> */}
    </div>
  );
}
