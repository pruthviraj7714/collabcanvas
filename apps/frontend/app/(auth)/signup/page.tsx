'use client'
import axios from "axios";
import { BACKEND_URL, JWT_SECRET } from '@repo/common'
const SignUpPage = () => {
    console.log(BACKEND_URL);
    

    const onSubmit = async (e) => {
        try {
            const data = e
            const res = await axios.post(`${BACKEND_URL}/user/signup`, {

            })
        } catch (error) {
            
        }
    }


  return (
    <div className="flex justify-center items-center min-h-screen">
      <form action={onSubmit}>
        <input type="text" placeholder="Enter email" />
        <input type="text" placeholder="Enter username" />
        <input type="text" placeholder="Enter password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUpPage;
