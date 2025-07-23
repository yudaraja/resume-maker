import React, { useState } from 'react'

const InputSkills = () => {
    return function SkillInput({ label, value, onChange }) {
        const [input, setInput] = useState('')

        const handleAdd = () => {
            if (input && !value.includes(input)) {
                onChange([...value, input])
                setInput('')
            }
        }

        const handleRemove = item => {
            onChange(value.filter(skill => skill !== item))
        }

        return (
            <div>
                <label>{label}</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {value.map(skill => (
                        <span
                            key={skill}
                            style={{ background: '#ddd', padding: '4px 8px', borderRadius: 4 }}
                        >
                            {skill} <button onClick={() => handleRemove(skill)}>x</button>
                        </span>
                    ))}
                </div>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    placeholder="Add a skill"
                />
                <button onClick={handleAdd}>Add</button>
            </div>
        )
    }
}

export default InputSkills
