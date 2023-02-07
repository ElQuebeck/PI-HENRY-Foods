import CardDetail from '../CardDetail/CardDetail'
import style from "./CardDetailContainer.module.css"
import {useSelector} from "react-redux"


export default function CardDetailContainer() {
 
  const recipes = useSelector(state => state.recipes)
  //console.log("------->", recipes)
  return (
    <div className={style.container}>
        {recipes.map((r) => {
            return <CardDetail 
                        id = {r.id}
                        title = {r.title}
                        diets = {r.diets}
                        image = {r.image}
                        summary = {r.summary}
                        healthscore = {r.healthscore}
                        steps = {r.steps}
                        />
        })}
    </div>
  )
}
