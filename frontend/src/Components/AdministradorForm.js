import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
  
const AdminForm = (props) => {
  const validationSchema = Yup.object().shape({
    rut: Yup.string().required("Required"),
    nombre: Yup.string().required("Required"),
    primerApellido: Yup.string().required("Required"),
    segundoApellido: Yup.string().required("Required"),
    aniosExperiencia: Yup.number(),
    contrasenia: Yup.string().required("Required"),
    confirmarContrasenia: Yup.string().required("Required")
  });

  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
        <FormGroup>
            <label for="rut"> Rut </label>
            <Field name="rut" type="text" placeholder="Ej: 12.134.567-8"
                className="form-control" />
            <ErrorMessage
              name="rut"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label for="nombre"> Nombre </label>
            <Field name="nombre" type="text" 
                className="form-control" />
            <ErrorMessage
              name="nombre"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label for="primerApellido"> Primer apellido </label>
            <Field name="primerApellido" type="text" 
                className="form-control" />
            <ErrorMessage
              name="primerApellido"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label for="segundoApellido"> Segundo apellido </label>
            <Field name="segundoApellido" type="text"
                className="form-control" />
            <ErrorMessage
              name="segundoApellido"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label for="aniosExperiencia"> Años de experiencia </label>
            <Field name="aniosExperiencia" type="number" 
                className="form-control" />
            <ErrorMessage
              name="aniosExperiencia"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup>
            <label for="contrasenia"> Contraseña </label>
            <Field name="contrasenia" type="password"
                className="form-control" />
            <ErrorMessage
              name="contrasenia"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label for="confirmarContrasenia"> Confirmar contraseña </label>
            <Field name="confirmarContrasenia" type="password" 
                className="form-control" />
            <ErrorMessage
              name="confirmarContrasenia"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <Button variant="danger" size="lg"
            block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
  
export default AdminForm;