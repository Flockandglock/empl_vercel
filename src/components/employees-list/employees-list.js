import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useSorted } from "../../hooks/useSorted";
import { togglePropEmpl, employeesDeleted } from "../employees-list/emplSlice";

import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';


const EmployeesList = () => {

    const {employees} = useSelector(state => state.employees);
    const {activeFilter, query} = useSelector(state => state.filters);
    const sortedAndSearchedPost = useSorted(employees, activeFilter, query);
    
    const dispatch = useDispatch();

    // Меняем свойство rise/increase. Колбэком прокидываем в EmployeesListItem.
    const onToggleProp = (id, prop) => {
        // эта фун-ия принимает массив с объектами и меняет свойство 1 объекта на противоположное, а остальные объекты остаются неизменными
        const prevEmpl = (empls) => {
            return empls.map(item => 
                    item.id === id ?
                    {
                        ...item,
                        [prop]: !item[prop]
                    }
                    : item
                )
        };
        // передаем наших работников, а результат работы диспатчим в наш стейт
        const getPrevEmpl = prevEmpl(employees);
        dispatch(togglePropEmpl(getPrevEmpl));
    };

    // Удаляем работника. Оборачиваем в Callback, чтобы не было перерендеров дочернего компонента. Сперва удаляется с сервера, потом фильтруем сосояние по id
    const removeEmpl = useCallback((id) => {
        dispatch(employeesDeleted(id))
    }, []);
    
    // формируем массив наших работников{объетов}
    const renderEmplList = (arr) => {
        if (arr.length === 0) {
            return <h5>Работников пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
           return <EmployeesListItem key={id} 
                                    {...props} 
                                    onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                                    removeEmpl={() => removeEmpl(id)} />
        });
    };

    const elements = renderEmplList(sortedAndSearchedPost);


    return (
            <ul className="app-list list-group">
               {elements}
            </ul>
    )
}

export default EmployeesList;