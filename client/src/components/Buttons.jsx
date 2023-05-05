const btnClass =  "w-full mb-3 py-2 px-5 rounded-lg transition duration-200"

const SubmitButton = (props) => {
    return (
        <button {...props}
            type="submit" 
            className={`${btnClass} bg-purple-500 hover:bg-purple-600`}
        >
            Submit
        </button>
    )
}

const DeleteButton = (props) => {
    return (
        <button {...props}
            className={`${btnClass} bg-red-500 hover:bg-red-600`}
        >
            Delete
        </button>
    )
}

const UpdateButton = (props) => {
    return (
        <button {...props}
            className={`${btnClass} bg-emerald-500 hover:bg-emerald-600`}
        >
            Update
        </button>
    )
}

export { SubmitButton, DeleteButton, UpdateButton }