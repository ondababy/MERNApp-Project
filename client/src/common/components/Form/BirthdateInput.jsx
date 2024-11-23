import React from 'react';

export default function BirthdateInput({ label, refer, meta, outerStyle, value, ...inputProps }) {
  const [age, setAge] = React.useState(0);
  const [date, setDate] = React.useState(null);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  React.useEffect(() => {
    if (value) {
      const formattedDate = value.split('T')[0];
      setDate(formattedDate);
      setAge(calculateAge(formattedDate));
    }
  }, [value]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setAge(calculateAge(newDate));
  };

  return (
    <div className={outerStyle}>
      <div className="flex items-center gap-2">
        <div className='w-full'>
          <label className={`${meta?.touched && meta?.error ? 'text-error' : 'text-base-content'}`}>{label}</label>
          <input
            className={`input input-bordered ${meta?.touched && meta?.error ? 'input-error' : 'input-primary'} w-full`}
            ref={refer}
            {...inputProps}
            type='date'
            value={date || ''}
            onChange={handleDateChange}
          />
        </div>
        <div className='w-1/3'>
          <label className={`${meta?.touched && meta?.error ? 'text-error' : 'text-base-content'}`}>Age</label>
          <input
            className={`input input-bordered ${meta?.touched && meta?.error ? 'input-error' : 'input-primary'} w-full input-disabled`}
            ref={refer}
            {...inputProps}
            type='text'
            disabled
            value={age}
          />
        </div>
      </div>
      {meta?.touched && meta?.error && <div className="text-xs italic text-error">{meta?.error}</div>}
    </div>
  );
}