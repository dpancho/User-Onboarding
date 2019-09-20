import React, {useState, useEffect} from "react";
import {Form , Field, withFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, touched, values, status }) => {
    const [people, setPeople] = useState([]);
    useEffect(() => {
        status && setPeople(people => [...people,status])
    }, [status]);
    
    return (
        <div className="form-styles">
            <h1>ADD A USER YO!</h1>
            <Form>
                <Field type="text" name="name" placeholder="Enter your name fool"/>
                    {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="Enter your email fool"/>
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field type="password" name="password" placeholder="Enter your password fool"/>
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label>
                Terms of Service
                <Field type="checkbox" name="checkbox" checked={values.checkbox}/>
                {touched.checkbox && errors.checkbox && (
                    <p className="error">{errors.checkbox}</p>
                )}
                </label>
                <button type="submit">Submit you Fool!</button>
            </Form>

            {people.map(e => (
            <ul key={e.id}>
            <li>Name: {e.name}</li>
            <li>email: {e.email}</li>
            <li>password: {e.password}</li>
            </ul>
            ))}
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, checkbox}) {
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            checkbox: checkbox || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().min(2, "Name too short").required(),
        email: Yup.string().email().required("Email required"),
        password: Yup.string().min(5, "Must be at least 5 characters").required(),
        checkbox: Yup.bool().oneOf([true], "Check the box fool")
    }),

    handleSubmit(values, { setStatus }) {
        axios
          // values is our object with all our data on it.
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            setStatus(res.data);
            console.log(res);
          })
          .catch(err => console.log(err.response));
      }
})(UserForm);
export default FormikUserForm;