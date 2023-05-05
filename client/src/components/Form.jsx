const Input = ({ type='text', ...props }) => {
    return (
        <div className="my-3">
            <label className={'text-gray-300'} {...props}>{props.text}</label>
            <input type={type} {...props} 
                className={'w-full transition duration-200 border outline-none border-slate-400 focus:border-slate-200 p-3 rounded-lg my-3'}
            />
        </div>
    )
}

const Form = ({ children, ...props }) => {
    return (
        <form {...props} 
            className={'w-[500px] border border-slate-500 p-5 rounded-lg'}
        >
            {children}
        </form>
    )
}

Form.input = Input

export default Form