import React from 'react'

const CheckboxInput = ({name, label, defaultValue, isChecked}) => {
  return (
    <div className='form-control items-center'>
    <label htmlFor={defaultValue} className='label cursor-pointer mr-1'>
        <span className='label-text capitalize'>{label}</span>
    </label>
    <input type='checkbox' id={defaultValue} name={name} value={defaultValue} defaultChecked={isChecked} className={`checkbox checkbox-success`} />
    </div>
  )
}

export default CheckboxInput
