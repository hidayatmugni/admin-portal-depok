import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";

const GayaHidup = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [description_2, setDescription_2] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [content_2, setContent_2] = useState("");
  const [content_3, setContent_3] = useState("");
  const [content_4, setContent_4] = useState("");
  const [content_5, setContent_5] = useState("");
  const [edit, setEdit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  // api url
  const API_URL = import.meta.env.VITE_API_URL_GAYAHIDUP;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const updatedData = response.data.map((item) => ({
          ...item,
          imageUrl: `${baseUrl}${item.image}`,
        }));
        setData(updatedData);
      })
      .catch((err) => {
        setError("There was an error fetching data!");
        console.error("There was an error fetching data!", err);
      });
  }, [API_URL, baseUrl]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus data?");
    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setData(data.filter((item) => item.id !== id));
      alert("Data berhasil dihapus.");
    } catch (err) {
      setError("Error deleting data: " + (err.response?.data?.message || err.message));
      console.error("Error deleting data", err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setDescription_2(item.description_2);
    setDate(item.date);
    setContent(item.content);
    setContent_2(item.content_2);
    setContent_3(item.content_3);
    setContent_4(item.content_4);
    setContent_5(item.content_5);
    setEdit(item);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!title || !description || !content) {
      setError("Title, description, and content are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("description_2", description_2);
      formData.append("date", date);
      if (image) {
        formData.append("image", image);
      }
      formData.append("content", content);
      formData.append("content_2", content_2);
      formData.append("content_3", content_3);
      formData.append("content_4", content_4);
      formData.append("content_5", content_5);

      await axios.put(`${API_URL}/${edit._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setData(data.map((item) => (item.id === edit.id ? { ...item, title, description, description_2, date, content, content_2, content_3, content_4, content_5 } : item)));

      resetForm();
      alert("Data berhasil diupdate.");
    } catch (error) {
      setError("Error updating data");
      console.error("Error updating data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!title || !description || !content) {
      setError("Title, description, and content are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("description_2", description_2);
      formData.append("date", date);
      if (image) {
        formData.append("image", image);
      }
      formData.append("content", content);
      formData.append("content_2", content_2);
      formData.append("content_3", content_3);
      formData.append("content_4", content_4);
      formData.append("content_5", content_5);

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData([...data, response.data]);

      resetForm();
      alert("Data berhasil di tambahkan.");
    } catch (error) {
      setError("Error submitting data");
      console.error("Error submitting data", error);
    }
  };
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDescription_2("");
    setImage(null);
    setDate("");
    setContent("");
    setContent_2("");
    setContent_3("");
    setContent_4("");
    setContent_5("");
    setEdit(null);
    setIsFormVisible(false); // Sembunyikan form setelah submit
  };

  return (
    <div>
      <div className="w-full">
        <Navbar></Navbar>
        <div className="flex flex-col justify-center p-10 lg:mt-20 md:mt-16 mt-10">
          <h1 className="text-center lg:text-4xl md:text-2xl text-2xl">Berita Gaya Hidup</h1>
          <button className="text-center bg-green-500 hover:bg-green-700 max-w-md mx-auto text-white font-bold py-2 px-4 rounded my-4" onClick={() => setIsFormVisible(true)}>
            Tambah Data <strong className="text-2xl">+</strong>
          </button>

          {isFormVisible && (
            <form className="mt-4 lg:px-20 md:px-10 px-2 flex-col gap-4 w-full justify-center lg:mx-10" onSubmit={edit ? handleUpdate : handleSubmit}>
              <div className="flex flex-col">
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Title</label>
                  <input className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Description</label>
                  <textarea className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Description 2</label>
                  <input className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text" value={description_2} onChange={(e) => setDescription_2(e.target.value)} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Image</label>
                  <input className="border-2 border-blue-500 outline-none rounded-lg p-2" type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Date</label>
                  <input className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Content 1</label>
                  <textarea className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text-area" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Content 2</label>
                  <textarea className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text" value={content_2} onChange={(e) => setContent_2(e.target.value)} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Content 3</label>
                  <textarea className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text" value={content_3} onChange={(e) => setContent_3(e.target.value)} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Content 4</label>
                  <textarea className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text" value={content_4} onChange={(e) => setContent_4(e.target.value)} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="text-xl font-semibold">Content 5</label>
                  <textarea className="border-2 border-blue-500 outline-none rounded-lg p-2" type="text" value={content_5} onChange={(e) => setContent_5(e.target.value)} />
                </div>
                <button className="w-1/3 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                  {edit ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-white">
          <div className="flex flex-wrap justify-center">
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item._id} className="flex flex-col gap-4 p-4 border max-w-[400px] rounded-2xl hover:bg-gray-100 m-4 relative shadow-md">
                  {item.imageUrl && (
                    <div className="w-full max-h-[250px]">
                      <img className="w-full h-full object-cover rounded-2xl" src={item.imageUrl} alt="Image" onError={(e) => (e.target.src = "/path/to/fallback-image.png")} />
                    </div>
                  )}
                  <h1 className="text-md">
                    <strong>Title</strong>: {item.title}
                  </h1>
                  <p className="text-sm">
                    <strong>Description</strong>: {item.description}
                  </p>
                  <p className="text-sm">
                    <strong>Description 2</strong>: {item.description_2}
                  </p>
                  <p className="text-sm">
                    <strong>Tanggal Berita</strong>: {item.date}
                  </p>
                  <p className="text-sm">
                    <strong>Content 1</strong>: {item.content}
                  </p>
                  <p className="text-sm">
                    <strong>Content 2</strong>: {item.content_2}
                  </p>
                  <p className="text-sm">
                    <strong>Content 3</strong>: {item.content_3}
                  </p>
                  <p className="text-sm">
                    <strong>Content 4</strong>: {item.content_4}
                  </p>
                  <p className="text-sm">
                    <strong>Content 5</strong>: {item.content_5}
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => handleDelete(item._id)} className=" bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded">
                      Delete
                    </button>
                    <button onClick={() => handleEdit(item)} className=" bottom-4 right-20 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded">
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xl w-full">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GayaHidup;
