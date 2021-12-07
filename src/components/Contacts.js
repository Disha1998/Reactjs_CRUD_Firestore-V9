import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import {
  onSnapshot,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  // deleteField,
} from "firebase/firestore";
// import { logRoles } from "@testing-library/dom";

// import {storage, default as fire} from 'config';

// import { doc, onSnapshot } from "firebase/firestore";

const Contacts = () => {
  // const notify = () => toast("Wow so easy!");

  var [formVal, setformVal] = useState([
    { fullName: "", mobile: "", email: "", address: "" },
  ]);

  var [contactObjects, setContactObjects] = useState([
    {
      fullName: "",
      mobile: "",
      email: "",
    },
  ]);
  var [currentId, setCurrentId] = useState();
  // var db = firebase.database();

  const [userData, setUserData] = useState([]);

  // similar to componentDidMount
  useEffect(() => {
    onSnapshot(collection(db, "ReactCRUD"), (snapshot) =>
      setContactObjects(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
    console.log(userData, "user data==>");
  }, []);

  // add data
  async function AddData(data) {
    console.log(data.id, "dataaa");
    await addDoc(collection(db, "ReactCRUD"), {
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
    });
  }

  // delete---------------------------------------->

  const handleDelete = async (id) => {
    console.log(id, "idd");
    await deleteDoc(doc(db, "ReactCRUD", id));

    console.log(id, "deleteee===>");
  };

  // edit/update--------------------------------------->

  const handelUpdate = async (data) => {
    // console.log(data,"update handelll");
    const docRef = doc(db, "ReactCRUD", data.id);
    console.log(docRef, "doc refff");
    await updateDoc(docRef, {
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
    });
    console.log(data.id, "update id");
    setformVal({ fullName: "", mobile: "", email: "", address: "" });
  };

  // submit form ----------------------------------------->

  async function submitFormdata() {
    if (formVal.id === "" || formVal.id === undefined) {
      // setCurrentId("");
      const { fullName, email, mobile } = formVal;
      console.log(formVal, "form val");
      AddData({
        fullName: fullName,
        email: email,
        mobile: mobile,
      });
      setformVal({ fullName: "", mobile: "", email: "" });
    } else {
      handelUpdate(formVal);
    }
  }
  //  Edit pencil--------------------------->

  const EditPencil = async (data) => {
    const docRef = doc(db, "ReactCRUD", data.id);
    console.log(docRef, "doc refff");
    setCurrentId(data.id);
    console.log(data.id, "update id");
    setformVal(data);
  };
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          {/* <ContactForm /> */}
          <form autoComplete="off">
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <input
                className="form-control"
                placeholder="Full Name"
                name="fullName"
                value={formVal.fullName}
                onChange={(e) => {
                  setformVal({ ...formVal, fullName: e.target.value });
                }}
              />
            </div>
            <div className="form-row">
              <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                </div>
                <input
                  className="form-control"
                  placeholder="Mobile"
                  name="mobile"
                  value={formVal.mobile}
                  onChange={(e) => {
                    setformVal({ ...formVal, mobile: e.target.value });
                  }}
                />
              </div>
              <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </div>
                </div>
                <input
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formVal.email}
                  onChange={(e) => {
                    setformVal({ ...formVal, email: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="button"
                value={
                  formVal.id === "" || formVal.id === undefined
                    ? "Save"
                    : "Update"
                }
                className="btn btn-primary btn-block"
                onClick={submitFormdata}
              />
            </div>

            {/* form */}
          </form>
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactObjects.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.fullName}</td>
                    <td>{data.mobile}</td>
                    <td>{data.email}</td>
                    <td>
                      <a
                        href
                        className="btn text-primary"
                        onClick={() => EditPencil(data)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a
                        href
                        className="btn text-danger"
                        onClick={() => handleDelete(data.id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
