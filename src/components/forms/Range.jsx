export function Range ({value, onChange}) {
    return <div>
        <input 
            type="range" 
            className="form-range" 
            min="1"
            max="400"
            step="1" 
            value={value}
            onChange={
                (e) => onChange(Number(e.target.value))
            }
        />
    </div>
}