import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
  
const EventForm = (props) => {
  const validationSchema = Yup.object().shape({
    tipo: Yup.string().required("Required"),
    nombre: Yup.string().required("Required"),
    direccion: Yup.string().required("Required"),
    ciudad: Yup.string().required("Required"),
    region: Yup.string().required("Required"),
    dia: Yup.number().required("Required"),
    mes: Yup.number().required("Required"),
    anio: Yup.number().required("Required"),
    hora: Yup.string().required("Required"),
    precio: Yup.number(),
    descripcion: Yup.string().required("Required"),
    rutAdministrador: Yup.string().required("Required"),
    cantidadDeTickets: Yup.string().required("Required"),
  });

  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
        <FormGroup>
          <label for="nombre"> Nombre de evento </label>
            <Field name="nombre" type="text"
                className="form-control" />
            <ErrorMessage
              name="nombre"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="tipo"> Tipo de evento </label>
            <Field name="tipo" type="text" placeholder="Musical o Gastronomico"
                className="form-control" />
            <ErrorMessage
              name="tipo"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="direccion"> Dirección </label>
            <Field name="direccion" type="text"
                className="form-control" />
            <ErrorMessage
              name="direccion"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="ciudad"> Ciudad </label>
            <Field name="ciudad" type="text" 
                className="form-control" />
            <ErrorMessage
              name="ciudad"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="region"> Región </label>
            <Field name="region" type="text"
                className="form-control" />
            <ErrorMessage
              name="region"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="dia"> Día </label>
            <Field name="dia" type="text" 
                className="form-control" />
            <ErrorMessage
              name="dia"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="mes"> Mes </label>
            <Field name="mes" type="text"
                className="form-control" />
            <ErrorMessage
              name="mes"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="anio"> Año </label>
            <Field name="anio" type="text"
                className="form-control" />
            <ErrorMessage
              name="anio"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="hora"> Hora </label>
            <Field name="hora" type="text"
                className="form-control" />
            <ErrorMessage
              name="hora"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="precio"> Precio entrada </label>
            <Field name="precio" type="number" 
                className="form-control" />
            <ErrorMessage
              name="precio"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="descripcion"> Descripción de evento </label>
            <Field name="descripcion" type="text" 
                className="form-control" />
            <ErrorMessage
              name="descripcion"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="rutAdministrador"> Rut de administrador </label>
            <Field name="rutAdministrador" type="text" placeholder="Ej: 12.134.567-8" 
                className="form-control" />
            <ErrorMessage
              name="rutAdministrador"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
          <label for="cantidadDeTickets"> Cantidad de tickets </label>
            <Field name="cantidadDeTickets" type="number" 
                className="form-control" />
            <ErrorMessage
              name="cantidadDeTickets"
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
  
export default EventForm;