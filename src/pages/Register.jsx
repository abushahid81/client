import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img3 from "../images/img3.jpg"

export const Register = () => {

const [user,setUser] = useState({
    username:"",
    email:"",
    phone:"",
    password:""
})


const navigate = useNavigate();

const { storeTokenInLS } = useAuth();

const handleInput = (e)=>{
    console.log(e)
    const name = e.target.name;
    const value = e.target.value;

setUser({
        ...user,
        [name]:value
    })
}


const handleSubmit =  async (e) => {   
   e.preventDefault();                     //prevent from refreshing page
   console.log(user);

   try {
    const response = await fetch("http://localhost:5000/api/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user),
  
    });
    const res_data = await response.json();
    console.log("response from serverrrrr", res_data ); 
    
    if(response.ok){
      storeTokenInLS(res_data.token);
      setUser({username:"",email:"",phone:"",password:""});
      toast.success("registration successful")
      navigate("/")
      }else{
        toast.error(res_data.extraDetails? res_data.extraDetails : res_data.message)
      }

  } 
          

    catch (error) {
        console.log("registration errorrrr", error)
   }   
}


    return (
    <>
        <section className="registration-page">
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols">
                <div className="registration-image reg-img">
                  <img
                    src={img3}
                    alt="a nurse with a cute look"
                    width="400"
                    height="500"
                  />
                </div>
                <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Your Name..."
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Your Email..."
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">Mobile No.</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter Your Mobile No..."
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Your Password..."
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
   </>
  );


};
