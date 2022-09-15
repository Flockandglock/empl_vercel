import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {addEmployees} from '../employees-list/emplSlice';
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import './employees-add-form.css';


const EmployeesAddForm = () => {

    const dispatch = useDispatch();

    // отправляет наш, новы объект, в стейт редакса и на сервер
    const onSubmit = (value, actions) => {
        const newEmpl = {
            id: v4(),
            name: value.name,
            salary: value.salary,
            increase: false,
            rise: false,
            moreThen1000: value.salary >= 1000 ? true : false
        };
        dispatch(addEmployees(newEmpl))
        
        // отчищает форму Formik, после отправки данных
        actions.resetForm({value: {
            name: '',
            salary: '',
        }})
    };


    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <Formik  initialValues={{ name: '', salary: ''}}
                    validationSchema = {Yup.object({
                        name: Yup.string()
                                .min(2, 'Минимум 2 символа')
                                .required('Это обязательное поле'),
                        salary: Yup.number()
                                    .min(100, 'Не маловато ли?')
                                    .max(10000, 'А это уже перебор')
                                    .required('Это обязательное поле')
                    })}
                     onSubmit={(value, actions) => onSubmit(value, actions)}>
                <Form className="add-form ">
                    <Field type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?" 
                        name='name'
                        />
                    <ErrorMessage name='name'>{msg => <div>{msg}</div>}</ErrorMessage>
                    <Field type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?" 
                        name='salary'
                        />
                    <ErrorMessage name='salary'>{msg => <div>{msg}</div>}</ErrorMessage>
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EmployeesAddForm;