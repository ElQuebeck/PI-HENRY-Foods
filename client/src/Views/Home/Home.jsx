import React, { useEffect } from 'react'
import {useDispatch} from "react-redux"
import { getRecipes } from '../../Redux/Actions'
import CardsContainer from "../../Components/CardsContainer/CardsContainers"


export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])
  return (
    <div>
      <h1> HOME </h1>
      <CardsContainer />
    </div>
  )
}
