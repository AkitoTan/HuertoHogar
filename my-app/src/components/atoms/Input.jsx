const input = ({label,...props}) =>(
    <div>
        <label>{label}</label>
        <input {...props} className="form-control"/>
    </div>
);

export default input;
