// "use client";
// import React, { useEffect, useState } from "react";
// import { supabase } from "../../utils/supabase";

// const User = () => {
//   // State for form input
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [userData, setUserData] = useState([]);

//   // Fetch users from Supabase
//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   async function fetchUserDetails() {
//     try {
//       let { data, error } = await supabase.from("user").select("*");
//       if (error) throw error;
//       setUserData(data);
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//     }
//   }

//   // Function to handle form submission
//   async function handleSubmit(e) {
//     e.preventDefault(); // Prevent page reload

//     if (!name || !email) {
//       alert("Please enter both name and email.");
//       return;
//     }

//     try {
//       const { data, error } = await supabase
//         .from("user") // Ensure your table name is correct
//         .insert([{ name, email }]);

//       if (error) {
//         console.error("Supabase Error:", error);
//         alert(`Error: ${error.message}`);
//         return;
//       }

//       console.log("User added:", data);
//       setName("");
//       setEmail("");
//       fetchUserDetails(); // Refresh the user list
//     } catch (error) {
//       console.error("Unexpected Error:", error);
//       alert("Something went wrong. Check the console.");
//     }
//   }

//   return (
//     <div className="container mx-auto pt-9 max-w-[900px]">
//       {/* Display user list */}
//       <ul>
//         {userData.map((obj, i) => (
//           <div key={i}>
//             <li>{obj.name}</li>
//             <li>{obj.email}</li>
//           </div>
//         ))}
//       </ul>

//       {/* Form */}
//       <form onSubmit={handleSubmit}>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border border-solid border-black text-black placeholder:text-black p-3 rounded-lg text-base placeholder:text-base w-full placeholder:font-semibold outline-none"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border border-solid border-black text-black placeholder:text-black p-3 rounded-lg text-base placeholder:text-base w-full placeholder:font-semibold outline-none"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="py-2 px-4 bg-green-600 rounded-lg text-white text-lg mt-6"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default User;
"use client";
import React, { useState } from "react";
import { supabase } from "../../utils/supabase";

const User = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, lastname } = formData;
    if (!name || !email || !lastname) {
      alert("Please enter both name and email.");
      return;
    }

    try {
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
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert("Something went wrong. Check the console.");
    }
  }

  return (
    <div className="container mx-auto pt-9 max-w-[900px]">
      <h1 className="text-black text-4xl pb-6 font-semibold text-center">
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
              className="border border-solid border-black p-3 rounded-lg w-full outline-none text-black placeholder:text-black font-medium"
              required
            />
            <input
              type="text"
              placeholder="lastname"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className="border border-solid border-black p-3 rounded-lg w-full outline-none text-black placeholder:text-black font-medium"
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
            className="border border-solid border-black p-3 rounded-lg w-full outline-none text-black placeholder:text-black font-medium"
            required
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-green-600 rounded-lg text-white mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default User;
