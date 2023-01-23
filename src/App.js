import './App.css';
import React, {useState} from 'react';
import { Formik } from "formik";

export const App=() =>{
  const [form,setForm] = useState([]);
  const regex = {
      title: /^[a-zA-Z0-9_.+ -]{2,20}$/,
      email: /^[a-zA-Z0-9_.+-]{5,}@[a-zA-Z0-9-]{3,10}\.[a-zA-Z0-9-.]{2,}$/
  };

  const onChange=(e)=>{
    setForm( {
      ...form,[e.target.name]:e.target.value
    })
  }
  function handleValidate(){
    const errors = {};
    if(!form.title){
       errors.title="Bạn hãy nhập tiêu đề!!";
    }
    else if(!regex.title.test(form.title)){
      errors.title = "Tiêu đề hợp lệ phải không dấu dài hơn 2 ký tự và ngắn hơn 20 ký tự!!"
    }
    if (!form.email) {
      errors.email = "Bạn phải nhập email liên hệ!!";
    }
    else if(!regex.email.test(form.email)){
      errors.email = "Email không hợp lệ, định dạng chuẩn examp@abc.gi!!"
    }
    if (!form.mess) {
      errors.mess = "Bạn hãy nhập tin nhắn!!";
    }
    else if(form.mess.length < 5){
      errors.mess = "Tin nhắn có nội dung quá ngắn!!"
    }
    
    return errors;
      
  }
  function handleSubmit(){
      alert(`Send ${form.name} thành công!!`)
  }
  return(
  <div className='container float-start'>
    <h1 className='mt-2 my-3'>Mail form</h1>
      <Formik 
      initialValues={form}
      validate={handleValidate}
      onSubmit={handleSubmit}
      >
      {({ errors , handleSubmit })=>(
        <form onSubmit={handleSubmit }>
        <div className= {`custom-input ${errors.email ? "custom-input-error" : ""}`}>
          <label>To</label>
          <input name='email' type="text" value={form.email||''} onChange={onChange}/>
          <p className="error">{errors.email}</p>
        </div>
        <div className= {`custom-input ${errors.title ? "custom-input-error" : ""}`}>
          <label>Title</label>
          <input name='title' type="text" value={form.title||''} onChange={onChange}/>
          <p className="error">{errors.title}</p>
        </div>
       
        <div className={`custom-input ${errors.mess ? "custom-input-error" : ""}`} >
          <label>Message</label>
          <textarea  name="mess" cols={40} rows={2} type="textarea" value={form.mess||''}     onChange={onChange}></textarea>
          <p className="error">{errors.mess}</p>
        </div>
        <input  type="file"/>
        <button className='btn btn-success mt-2' type="submit">Submit</button>
        </form>
      )}
      </Formik>
  </div>
  );
}

