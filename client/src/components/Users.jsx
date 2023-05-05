import { DeleteButton, SubmitButton, UpdateButton } from "./Buttons";
import axios from 'axios'
import { useState, useEffect } from 'react'
import Form from './Form'

const Users = () => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [userId, setUserId] = useState(0)
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
  
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('http://localhost:4000/users')
                setUsers(data.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetchUsers()
    }, [])
    
    const [form, setForm] = useState({
      name: '',
      email: '',
      age: ''
    })
    
    const createNewUser = async (e) => {
      e.preventDefault()
      
      if(!form.name || !form.email || !form.age) {
        alert('Please fill out all fields')
        return
      } else {
        try {
            await axios.post('http://localhost:4000/users/store', form)
            .then(res => {
            setForm({
                name: '',
                email: '',
                age: ''
            })
            setUsers([...users, res.data.data])
            })
        } catch (error) {
            console.log(error)
        }
      }
      
    }
    
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/users/delete/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id))
            })
        } catch (error) {
            console.log(error)
        }
    }

    const openUpdateForm = (id) => {
        setUserId(Number(id))
        setUpdate(true)
        users.filter(user => {
            if(user.id === id) {
                setForm({
                    name: user.name,
                    email: user.email,
                    age: user.age
                })
            }
        })
    }
    
    const updateUser = async (e) => {
        e.preventDefault()

        if(!form.name || !form.email || !form.age) {
            alert('Please fill out all fields')
            return
        } else {
            try {
                await axios.patch(`http://localhost:4000/users/update/${userId}`, form)
                .then(res => {
                    setUsers(users.map(user => user.id === userId ? res.data.data : user))
                    setForm({
                        name: '',
                        email: '',
                        age: ''
                    })
                    setUpdate(false)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
      <div className="content w-screen flex items-start justify-center gap-10 p-5 my-10">
        { loading ? <h1>Loading...</h1> : null}

        { 
            update === true ? (
                <Form onSubmit={ updateUser }>
                    <div className="header w-full flex items-center justify-between">
                        <h1>Update User</h1>
                        <button className="transition duration-200 hover:text-red-400"
                         onClick={() => {
                            setUpdate(false)
                            setForm({
                                name: '',
                                email: '',
                                age: ''
                            })
                         }}
                        >
                            Cancel
                        </button>
                    </div>
                    <Form.input 
                        text={'Name'}
                        htmlFor={'name'} 
                        type="text" 
                        placeholder="What's the name?" 
                        onChange={ (e) => setForm({ ...form, name: e.target.value }) }
                        value={ form.name }
                    />
                    <Form.input 
                        text={'Email'}
                        htmlFor={'email'} 
                        type="text" 
                        placeholder="What's the email?" 
                        onChange={ (e) => setForm({ ...form, email: e.target.value }) }
                        value={ form.email }
                    />
                    <Form.input 
                        text={'Age'}
                        htmlFor={'age'} 
                        type="text" 
                        placeholder="What's the age?" 
                        onChange={ (e) => setForm({ ...form, age: e.target.value }) }
                        value={ form.age }
                    />
                    <SubmitButton onClick={ updateUser }/>
                </Form>
            ) : (
                <Form onSubmit={ createNewUser }>
                    <h1>Create New User</h1>
                    <Form.input 
                        text={'Name'}
                        htmlFor={'name'} 
                        type="text" 
                        placeholder="What's the name?" 
                        onChange={ (e) => setForm({ ...form, name: e.target.value }) }
                        value={ form.name }
                    />
                    <Form.input 
                        text={'Email'}
                        htmlFor={'email'} 
                        type="text" 
                        placeholder="What's the email?" 
                        onChange={ (e) => setForm({ ...form, email: e.target.value }) }
                        value={ form.email }
                    />
                    <Form.input 
                        text={'Age'}
                        htmlFor={'age'} 
                        type="text" 
                        placeholder="What's the age?" 
                        onChange={ (e) => setForm({ ...form, age: e.target.value }) }
                        value={ form.age }
                    />
                    <SubmitButton onClick={ createNewUser }/>
                </Form>
            )
        }
        
        
        <div className={'w-1/2 h-screen overflow-y-auto'}>
            <ul>
                {users && users.map((user, index) => {
                    return (
                        <li key={index} className={'border border-slate-500 p-5 rounded-lg mb-2 flex justify-between'}>
                            <div className="user-info">
                                <h3 className={'text-2xl font-semibold'}>{user.name}</h3>
                                <p className={'text-lg'}>{user.email}</p>
                                <p className={'text-lg'}>{user.age}</p>
                            </div>

                            <div className="user-action">
                                <DeleteButton onClick={() => deleteUser(user.id)}/>
                                <UpdateButton onClick={() => openUpdateForm(user.id)}/>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
      </div>
        
    )
}

export default Users