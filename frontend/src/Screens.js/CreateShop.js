import React, { useState } from "react";
import "./style.css";
import { Link,useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import {toast} from 'react-toastify'
export default function CreateJob() {
    const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [owner, setOwner] = useState("");
  const [type, setType] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const handleSubmit=async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    var result = await fetch("http://localhost:8000/api/shop/registerShop",{
        method : "Post",
        body : JSON.stringify({shopName,owner,type,latitude,longitude}),
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : "Bearer "+token
        }
    })
    var data = await result.json();
    if(data.success){
        toast.success(data.message)
         navigate('/')
    }else{
        toast.warning(data.message);
    }
  }
  return (
    <>
      <div className="form-container">
        <div className="card px-5 py-5">
          <div className=" mt-2">
            <h2 className="text-center fs-2">
              <MdCreateNewFolder className="fs- 4 fw-bold mx-2" />
              Create A Store
            </h2>
          </div>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Shop-Name
            </label>
            <input
              type="text"
              className="form-control"
        
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Owner-Name
            </label>
            <input
              type="text"
              className="form-control"
      
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Shop-Type
            </label>
            <input
              type="text"
              className="form-control"
      
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
         
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Latitude
            </label>
            <input
              type="text"
              className="form-control"
      
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Longitude
            </label>
            <input
              type="text"
              className="form-control"
      
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          
          
          
          
          <button type="submit" className="    btn btn-primary" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}
