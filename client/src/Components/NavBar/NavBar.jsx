import React from 'react'
import style from "./NavBar.module.css"
import {Link} from "react-router-dom"

export default function NavBar() {
  return (
    <div className={style.mainContainer}>
      <Link className={style.btnCustom} to="/home">
        <button className={style.cssbuttons_io_button}> Volver al Home
          <div className={style.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
          </div>
        </button>
      </Link>
      <Link className={style.logo} to="/home"> <img src={require("./../../Images/logo.webp").default} alt="" /> </Link>
      <Link className={style.btnCustom} to="/create">
        <button className={style.cssbuttons_io_button}> Nueva Receta
          <div className={style.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
          </div>
        </button>
      </Link>
    </div>
  )
}
