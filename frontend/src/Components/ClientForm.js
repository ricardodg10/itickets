import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
  
const ClientForm = (props) => {
  const validationSchema = Yup.object().shape({
    userRut: Yup.string().required("Required"),
    primer_nombre: Yup.string().required("Required"),
    primer_apellido: Yup.string().required("Required"),

  });
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
        <></>
        <FormGroup>
            <Field name="userRut" type="text" placeholder="Rut"
                className="form-control" />
            <ErrorMessage
              name="rut"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="primer_nombre" type="text" placeholder="Nombre"
                className="form-control" />
            <ErrorMessage
              name="name"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="primer_apellido" type="text" placeholder="Primer apellido"
                className="form-control" />
            <ErrorMessage
              name="address"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="segundo_apellido" type="text" placeholder="Segundo apellido"
                className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="num_contacto" type="number" placeholder="Número de contacto"
                className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="mail_contacto" type="text" placeholder="Email de contacto"
                className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="contrasenia" type="text" placeholder="Contraseña"
                className="form-control" />
            <ErrorMessage
              name="email"
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