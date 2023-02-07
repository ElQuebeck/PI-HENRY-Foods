import React from 'react'
import {Link} from "react-router-dom"
import style from "./Login.module.css"

export default function Login() {
  return (
    <div className={style.container}>
    <h1>Bienvenid@ al Recetario de El Quebeck</h1>
    <Link to= "/home"> HOME </Link>
    </div>
  )
}
