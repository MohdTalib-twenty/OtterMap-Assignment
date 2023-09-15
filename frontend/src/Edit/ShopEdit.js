import React, { useState } from "react";
import "../Screens.js/style.css";
import { Link,useNavigate, useParams } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import {toast} from 'react-toastify'
export default function ShopEdit() {
    const navigate = useNavigate();
    const {id,shopName,owner,type,latitude,longitude}=useParams();
  const [ShopName, setShopName] = useState(shopName);
  const [Owner, setOwner] = useState(owner);
  const [Type, setType] = useState(type);
  const [Latitude, setLatitude] = useState(latitude);
  const [Longitude, setLongitude] = useState(longitude);
  const handleSubmit=async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    var result = await fetch(`http://localhost:8000/api/shop/updateShop/${id}`,{
        method : "PUT",
        body : JSON.stringify({ShopName,Owner,Type,Latitude,Longitude}),
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
              Edit A Store
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
        
              value={ShopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Shop-Owner
            </label>
            <input
              type="text"
              className="form-control"
      
              value={Owner}
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
      
              value={Type}
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
      
              value={Latitude}
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
      
              value={Longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          
          
          
          
          <button type="submit" className="    btn btn-primary" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}
