"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Cta from "./common/Cta";

const User = () => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  // user show in localhost
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    detail();
  }, []);
  async function detail() {
    let { data: user, error } = await supabase.from("user").select("*");
    setUserData(user);
  }
  // delete rows
  async function deleteUser(id) {
    const { error } = await supabase.from("user").delete().eq("id", id);
    if (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete user.");
    } else {
      alert("User deleted successfully.");
      detail();
    }
    // setUserData(user);
  }
  // edit rows
  // async function editUser(id) {
  //   const { name, lastname, email } = formData;
  //   const { data, error } = await supabase
  //     .from("user")
  //     .update({ name, lastname, email })
  //     .eq("id", id)
  //     .select();
  //   if (error) {
  //     console.error("Edit Error:", error);
  //     alert("Failed to edit user.");
  //   } else {
  //     alert("User edited successfully.");
  //     detail();
  //   }
  // }
  function editUser(obj) {
    setFormData({
      name: obj.name,
      lastname: obj.lastname,
      email: obj.email,
    });
    setEditingId(obj.id);
  }

  async function saveUser() {
    const { name, lastname, email } = formData;
    const { error } = await supabase
      .from("user")
      .update({ name, lastname, email })
      .eq("id", editingId);
    if (error) {
      alert("Failed to update");
    } else {
      alert("User updated");
      setFormData({ name: "", lastname: "", email: "" });
      setEditingId(null);
      detail();
    }
  }

  // 🔁 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, lastname } = formData;

    if (!name || !email || !lastname) {
      alert("Please enter all fields.");
      return;
    }

    const { error } = await supabase
      .from("user")
      .insert([{ name, email, lastname }]);

    if (error) {
      console.error("Supabase Error:", error);
      alert(`Error: ${error.message}`);
      return;
    }
    setFormData({ name: "", email: "", lastname: "" });
    alert("User added successfully!");
  };

  return (
    <div className="container mx-auto pt-9 max-w-[900px]">
      <h1 className="text-black text-4xl pb-6 font-medium text-center">
        User Form
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="form_inputs"
              required
            />
            <input
              type="text"
              placeholder="lastname"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className="form_inputs"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="form_inputs"
            required
          />
        </div>
        {editingId ? (
          <Cta type="button" onClick={saveUser} className="!mt-6 !bg-cyan-700">
            Save
          </Cta>
        ) : (
          <Cta type="submit" className="!mt-6">
            Submit
          </Cta>
        )}   
      </form>
      <ul className="mt-5">
        {userData.map((obj, i) => (
          <div
            className="w-full border border-solid border-gray-500 p-3 mb-2 rounded-sm flex justify-between items-center"
            key={i}
          >
            <div>
              <li className=" text-fuchsia-950 tracking-wider text-lg font-medium">
                {obj.name}
                <span> {obj.lastname}</span>
              </li>
              <li>{obj.email}</li>
            </div>
            <div className="flex gap-3">
              <Cta onClick={() => deleteUser(obj.id)} variant="primary">
                Delete
              </Cta>
              <Cta variant="secondary" onClick={() => editUser(obj)}>
                Edit
              </Cta>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default User;
