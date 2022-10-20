import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
  
const ClientForm = (props) => {
  const validationSchema = Yup.object().shape({
    userRut: Yup.string().required("Required"),
    primerNombre: Yup.string().required("Required"),
    primerApellido: Yup.string().required("Required"),
    segundoApellido: Yup.string().required("Required"),
    mailContacto: Yup.string()
        .email("You have enter an invalid email address")
        .required("Required"),
    numContacto: Yup.number().required("Required"),
    contrasenia: Yup.string().required("Required")
  });

  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
        <FormGroup>  
            <Field name="userRut" type="text" placeholder="Rut"
                className="form-control" />
            <ErrorMessage
              name="userRut"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="primer_nombre" type="text" placeholder="Nombre"
                className="form-control" />
            <ErrorMessage
              name="primer_nombre"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="primer_apellido" type="text" placeholder="Primer apellido"
                className="form-control" />
            <ErrorMessage
              name="primer_apellido"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="segundo_apellido" type="text" placeholder="Segundo apellido"
                className="form-control" />
            <ErrorMessage
              name="segundo_apellido"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="num_contacto" type="number" placeholder="Número de contacto"
                className="form-control" />
            <ErrorMessage
              name="num_contacto"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="mail_contacto" type="text" placeholder="Email de contacto"
                className="form-control" />
            <ErrorMessage
              name="mail_contacto"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="contrasenia" type="password" placeholder="Contraseña"
                className="form-control" />
            <ErrorMessage
              name="contrasenia"
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
  
export default ClientForm;