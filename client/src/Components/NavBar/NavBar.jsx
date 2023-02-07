import React from 'react'
import style from "./NavBar.module.css"
import {Link} from "react-router-dom"

export default function NavBar() {
  return (
    <div className={style.mainContainer}>
        <Link to="/home"> HOME </Link>
        <Link to="/create">FORM/CREATE</Link>
    </div>
  )
}
