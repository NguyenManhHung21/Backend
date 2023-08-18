import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    // e.preventDefault();
    await axios.post("/create", { name, img });
    // navigate(`/`)
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="img"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Img(url)
          </label>
          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            type="text"
            id="img"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
