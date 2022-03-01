import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";


function Formulario() {
    const [sendSuccess,setSendSucess]=useState(false)
    const [data,setData]=useState({})
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    axios.post("http://localhost:3000/api/enviar",{
        user:data.usuario,
        email:data.email,
    })
    .then(async res=>{
        await axios.get("http://localhost:3000/api/data").then(res2=>{
            setData(res2.data.data)
        })
        setSendSucess(true);
    })
    .catch(err=>console.log("error",err))
  };
  const generalStyle={
    border:'1px solid white'
  }

  return (
    sendSuccess?      
        <table>
            <tr>
            <th style={generalStyle}>Usuario</th>
            <th style={generalStyle}>Email</th>
            </tr>
            {data.map((value,index)=>(
            <tr key={index}>
            <td style={generalStyle}>{value.user}</td>
            <td style={generalStyle}>{value.email}</td>
            </tr>
            ))}       
        </table>
    :
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Usuario" {...register("usuario", { required: true })} />
            {errors.usuario && <span>Campo requerido</span>}
            <input placeholder="Email" {...register("email", { required: true })} />
            {errors.email && <span>Campo requerido</span>}      
            <input type="submit" />
        </form>
    
  );
}
export default Formulario;