import './employees-list-item.css';

const EmployeesListItem = ({name, salary, rise, increase, onToggleProp, removeEmpl}) => {

    // динамически формируем класс. Он зависит от increase и rise
    let className = 'list-group-item  ';
    if (increase) {
        className += ' increase';
    }
    if (rise) {
        className += ' like';
    }

    
    return (
        <li className={className}>
            <span className="list-group-item-label" data-toggle='rise' onClick={onToggleProp}>{name}</span>
            <div className="salary">{`${salary} $`}</div>
            
            <div className='d-flex '>
                <button type="button"
                    className="btn-cookie btn-sm " data-toggle='increase' onClick={onToggleProp}>
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm " onClick={removeEmpl} >
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;