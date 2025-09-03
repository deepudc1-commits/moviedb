import React from 'react'

const SelectBtn = ({name, label, list, defaultValue}) => {
  return (
    <label htmlFor={name} className="form-control w-full max-w-xs">
        <div className="label mr-2">
            <span className="label-text">{label}</span>
        </div>
        <select name={name} id={name} defaultValue={defaultValue} className={`select select-bordered`}>
            {list.map((item) => {
               return <option key={item} value={item}>{item}</option>
            })}
        </select>
    </label>
  )
}

export default SelectBtn
