import {useEffect, useState } from "react";
import { PersonData } from "./data";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect((() =>{
    setData(PersonData);
  }),[]);

  const handlEdit = (id) =>{
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined){
      setIsUpdate(true);
      setName(dt[0].name);
      setEmail(dt[0].email);
      setId(id);
    }
  }

  const handlDelete = (id) =>{
    if(window.confirm("Are you sure, you want to delete the item with id : " + id + "?")){
        const dt = data.filter(item => item.id !== id);
        setData(dt);
    }
  }

  const handlClear = () =>{
    setName('');
    setEmail('');
    setIsUpdate(false);
  }

  const handlUpdate = () => {
    const index = data.map((i) =>{
      return i.id;
    }).indexOf(id);

    if(window.confirm('Are you sure, to save changes you made?')){
      const dt = [...data];
      dt[index].name = name;
      dt[index].email = email;
      setData(dt);
      handlClear();
    }else{
      handlClear();
    }
  }

  const handlSave = (e) =>{
    if(name === '' || email === ''){
      alert("Please enter name and email");
    }else{
      const dt = [...data];
      const newId = dt.reduce((max,obj) => (obj.id > max? obj.id : max), 0);

      const newObj = {
        id: newId+1,
        name: name,
        email: email
      }
      dt.push(newObj);
      setData(dt);
      handlClear();
    }
  }

  return (
    <div>
      <h1 style={{textAlign:"center", margin:'20px'}}>Contact Application</h1>
      <div style={{display: "flex", justifyContent:"center"}}>
        <div>
          <label style={{ padding:'20px'}}>
            Name: <input type="text" placeholder="enter name" style={{ margin:'15px'}} onChange={(e) => setName(e.target.value)} value={name}/>
          </label>
          <label style={{ padding:'20px'}}>
            Email:
            <input type="text" placeholder="enter email" style={{margin:'15px'}} onChange={(e) => setEmail(e.target.value)} value={email}/>
          </label>
        </div>
        <div>
          {
            isUpdate ?
            <button className="btn btn-warning mx-3" onClick={() => {handlUpdate()}}>Update</button> 
            :
            <button className="btn btn-success" style={{ margin:'30px'}} onClick={(e) =>{handlSave(e)}}>Save</button>
          }
          <button className="btn btn-warning" style={{ margin:'30px'}} onClick={() =>{handlClear()}}>Clear</button>
        </div>
      </div>

      <table className="my-5 mx-auto table table-hover table-bordered" style={{textAlign:"center"}}>
        <thead className="thead-dark">
          <tr>
            <th>Sr. no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button className="btn btn-primary mx-3" onClick={() => {handlEdit(item.id)}}>Edit</button>
                    <button className="btn btn-danger" onClick={() => {handlDelete(item.id)}}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
