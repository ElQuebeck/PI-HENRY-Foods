import React, { useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";

export default function Form() {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthscore: 0,
    steps: "",
    diets: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    setErrors(validate({ ...form, [property]: value }));
  };

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    healthscore: "",
    steps: "",
    diets: "",
  });

  const validate = (inputs) => {
    const errors = {};
    if (!inputs.title) errors.title = "El nombre de la receta es requerido";
    else if (inputs.title.length > 50)
      errors.title = "Debe tener 50 caracteres como máximo";
    else if (!inputs.summary)
      errors.summary = "El resumen de la receta es requerido";
    else if (inputs.summary.length > 300)
      errors.summary = "Debe tener 300 caracteres como máximo";
    else if (!inputs.healthscore)
      errors.healthscore = "El valor de salud es requerido";
    else if (inputs.healthscore > 100 || inputs.healthscore < 1)
      errors.healthscore = "El valor de salud es un numero del 0 al 100";
    else if (!inputs.steps)
      errors.steps = "Los pasos de elaboración son requeridos";
    else if (!inputs.diets) errors.diets = "Los tipos de dieta son requeridos";
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/recipes", form)
      .then((res) => alert(res.data))
      .then((res) => console.log(res))
      .catch((err) => alert(err));
  };

  return (
    <>
      <h2 className={styles.h2}>FORMULARIO PARA LA CREACION DE RECETAS</h2>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className={styles.container}>
          <div className={styles.form_group}>
            <label>Nombre de la receta: </label>
            <input
              className={errors.title && styles.warning}
              type="text"
              name="title"
              value={form.title}
              onChange={changeHandler}
              placeholder="Ingrese el nombre de la receta..."
            />
            <p className={styles.danger}>{errors.title}</p>
          </div>
          <div className={styles.form_group}>
            <label>Resumen de la receta: </label>
            <input
              className={errors.summary && styles.warning}
              type="text"
              name="summary"
              value={form.summary}
              onChange={changeHandler}
              placeholder="Agregue un resumen de la receta"
            />
            <p className={styles.danger}>{errors.summary}</p>
          </div>
          <div className={styles.form_group}>
            <label>Nivel de salubridad: </label>
            <input
              className={errors.healthscore && styles.warning}
              type="text"
              name="healthscore"
              value={form.healthscore}
              onChange={changeHandler}
            />
            <p className={styles.danger}>{errors.healthscore}</p>
          </div>
          <div className={styles.form_group}>
            <label>Pasos para realizarla: </label>
            <input
              className={errors.steps && styles.warning}
              type="text"
              name="steps"
              value={form.steps}
              onChange={changeHandler}
              placeholder="Paso a paso de tu receta..."
            />
            <p className={styles.danger}>{errors.steps}</p>
          </div>
          <div className={styles.form_group}>
            <label>Tipos de dieta: </label>
            <input
              className={errors.diets && styles.warning}
              type="text"
              name="diets"
              value={form.diets}
              onChange={changeHandler}
              placeholder="dietas..."
            />
            <p className={styles.danger}>{errors.steps}</p>
          </div>
        </div>
        <div>
          {Object.keys(errors).length === 0 ? (
            <button type="submit"> INGRESAR </button>
          ) : (
            <p> El formulario contiene errores </p>
          )}
        </div>
      </form>
    </>
  );
}
