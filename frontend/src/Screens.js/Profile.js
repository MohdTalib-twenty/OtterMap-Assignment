import React, { useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState();
  const [shops, setShops] = useState();
  const navigate=useNavigate();
  const fetchData = async () => {

    const id = JSON.parse(localStorage.getItem("User"))._id;
    const token = JSON.parse(localStorage.getItem("Token"));
    console.log(token)
    const response = await fetch(
      "http://localhost:8000/api/shop/get-shop-details-by-Id",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setShops(data.shops);
    
    }
  };
  useEffect(() => {
    var x = JSON.parse(localStorage.getItem("User"));
    if (x) {
      setUser(x);
    }
    fetchData();
    
  }, []);
  return (
    <>
      {user ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="container justify-content-center mt-5 align-item-center">
                  <div className="card mt-3 mb-4" style={{ width: "600px" }}>
                    <div className="d-flex flex-row">
                      <h3 className=" text-center text-primary fw-bold mx-3 mt-3">
                        <BiSolidUserCircle className="fw-bold text-primary fs-5 mx-2" />
                        {user.name}
                       
                      </h3>
                      <h4 className="ms-auto text-warning fs-3 fw-bold mt-3">
                        <AiFillEdit  onClick={()=>navigate(`/userEdit/${user.name}/${user.email}`)}/>
                      </h4>
                    </div>

                    <hr />
                    <div className="card-body">
                      <h5 className="card-title mx-3">Email : {user.email}</h5>
                      
                      <p className="card-text mx-3">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <h4 className="text-center text-primary mt-5 mb-5">
                Your Registered Shop
                </h4>
                <table class="table mx-5">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">idx</th>
                      <th scope="col">Shop-Name</th>
                      <th scope="col">Owner-Name</th>
                      <th scope="col">Shop-Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops && shops.length > 0 ? (
                      shops.map((application,idx) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{idx+1}</th>
                              <td>{application.shopName}</td>
                              <td>{application.owner}</td>
                              <td>{application.type}</td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <>
                        <h3>No Shop Registered</h3>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3>Something Went Wrong</h3>
        </>
      )}
    </>
  );
}
