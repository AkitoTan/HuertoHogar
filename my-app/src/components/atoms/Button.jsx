const Button = ({Children, ...props}) =>(
    <button{...props} className="btn btn-primary">{children}</button>
);

export default Button;