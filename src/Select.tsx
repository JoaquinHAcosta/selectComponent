import { useState, useEffect } from 'react'
import styles from './select.module.css'

type SelectOption = {
    label: string
    value: string | number
}

type SelectProps = {
    options: SelectOption[]
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

const Select = ({  value, onChange, options }: SelectProps) => {

    const [ isOpen, setIsOpen ] = useState(false)
    const [ highLightedIndex, setHighlightedIndex ] = useState(0)

    const clearOptions = () => {
        onChange(undefined)
    }

    const selectOption = (option: SelectOption) => {
        if(option !== value) onChange(option)
    }

    const isOptionSelected = (option: SelectOption) => {
        return option === value
    }

    useEffect(() => {
      if(isOpen) setHighlightedIndex(0)
    }, [isOpen])
    

  return (
    <div 
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(prev => !prev)} 
        tabIndex={0} 
        className={styles.container}
    >
        <span className={styles.value}>
            {value?.label}
        </span>
        <button 
            onClick={event => {
                event.stopPropagation()
                clearOptions()
            }}
            className={styles['clear-btn']}
        >&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
            {options.map((option, index) => (
                <li 
                    onClick={event => {
                        event.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`${styles.option} ${
                        isOptionSelected(option) ? styles.selected : ''
                    } ${
                        index === highLightedIndex ? styles.highLighted : ''
                    } `} 
                    key={option.value}
                >
                    {option.label}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Select