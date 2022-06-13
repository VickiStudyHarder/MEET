import React, {useState, useContext} from 'react';
import { Account, AccountContext } from './Account'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { authenticate } = useContext(AccountContext)

    const onSubmit = (event:any) => {
        console.log("On Submit")
        console.log(email, password)
        event.preventDefault();

          authenticate(email, password)
          .then((data:any) => {
            console.log("Logged In!", data);
            navigate('/Home')
          })
          .catch((err:any) => {
            console.error('Failed to login!', err)
          })
    };

    return (
        <div>
          <form onSubmit={onSubmit}>
            <label>email</label>
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <label>password</label>
            <input
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <button type='submit'>Login</button>
          </form>
        </div>
      );
}

export default SignUp;