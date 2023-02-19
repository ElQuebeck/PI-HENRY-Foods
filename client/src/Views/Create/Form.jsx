import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getDiets } from "../../Redux/Actions";

export default function Form() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.dietsList);
  useEffect(() => {
    if (!diets.length) {
      dispatch(getDiets());
    }
  }, [dispatch, diets]);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
    image: " ",
  });

  // const dietsValidate = form.steps.length;

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    if (property !== "diets") {
      setForm({ ...form, [property]: value });
      setErrors(validate({ ...form, [property]: value }));
      return;
    }
    if (event.target.checked) {
      if (form.diets.length && !form.diets.includes(value)) {
        setForm({ ...form, diets: [...form.diets, value] });
        setErrors(validate({ ...form, diets: [...form.diets, value] }));
        return;
      } else if (form.diets.length && form.diets.includes(value)) {
        return;
      } else setForm({ ...form, diets: [value] });
      setErrors(validate({ ...form, diets: [value] }));
    } else if (form.diets.length) {
      setForm({ ...form, diets: form.diets.filter((e) => e !== value) });
      setErrors(validate({ ...form, diets: form.diets.filter((e) => e !== value) }));
      return;
    } else return;
  };

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: "",
  });

  const validate = (inputs) => {
    const errors = {};
    if (!inputs.title) errors.title = "El nombre de la receta es requerido";
    else if (!isNaN(inputs.title))
      errors.title = "El nombre de contener letras";
    else if (inputs.title.length > 50)
      errors.title = "Debe tener 50 caracteres como máximo";
    else if (!inputs.summary)
      errors.summary = "El resumen de la receta es requerido";
    else if (!isNaN(inputs.summary))
      errors.summary = "El resumen de contener letras";
    else if (inputs.summary.length > 300)
      errors.summary = "Debe tener 300 caracteres como máximo";
    else if (!inputs.healthScore)
      errors.healthScore = "El valor de salud es requerido";
    else if (isNaN(inputs.healthScore))
      errors.healthScore = "El valor debe ser un número";
    else if (inputs.healthScore > 100 || inputs.healthScore < 1)
      errors.healthScore = "El valor de salud es un numero del 1 al 100";
    else if (!inputs.steps)
      errors.steps = "Los pasos de elaboración son requeridos";
    else if (!isNaN(inputs.steps))
      errors.steps = "Los pasos deben contener letras";
    else if (inputs.diets.length === 0)
      errors.diets = "Debe seleccionar al menos una dieta";
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/recipes", form)
      .then((res) => alert(res.data))
      // .then((res) => console.log(res))
      .catch((err) => alert(err));
  };

  return (
    <>
      <h2 className={styles.h2}>Agregar una nueva receta</h2>
      <form className={styles.form} onSubmit={(e) => submitHandler(e)}>
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
              className={errors.healthScore && styles.warning}
              type="number"
              min="1"
              max="100"
              name="healthScore"
              value={form.healthScore}
              onChange={changeHandler}
              placeholder="Ingrese un valor del 1 al 100..."
            />
            <p className={styles.danger}>{errors.healthScore}</p>
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
            <label>Url de la imagen: </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={changeHandler}
              placeholder="Inserte la url..."
            />
          </div>
          <div>
            <label className={styles.form_group}>Tipos de dieta: </label>
            {diets.map((x) => {
              return (
                <div key={x.id}>
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      onChange={changeHandler}
                      name="diets"
                      value={x.name}
                    />
                    {x.name}
                  </label>
                </div>
              );
            })}

            <p className={styles.danger}>{errors.diets}</p>
          </div>
          <div>
            {Object.keys(errors).length === 0 ? (
              <button className={styles.button} type="submit">
                <div className={styles.svg_wrapper_1}>
                  <div className={styles.svg_wrapper}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Crear Receta</span>
              </button>
            ) : (
              <p className={styles.danger}> El formulario contiene errores </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
