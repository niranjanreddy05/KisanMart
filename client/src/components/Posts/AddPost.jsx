import React from 'react';
import { useReducer, useState } from "react";
import { postReducer, INITIAL_STATE } from "../../reducers/postReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function AddPost() {

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      toast.success("Images uploaded successfully");
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  console.log(state);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (post) => {
      return newRequest.post("/posts", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts"]);
      toast.success("Post added successfully");
      navigate("/myposts");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Something went wrong");
      // Handle the error as needed
    },
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };
  
  return (
    <div className="flex px-4 sm:px-12 pt-24 justify-center">
      <div className="container max-w-screen-xl px-8 py-12">
        <h1 className="mb-8 text-gray-800  text-2xl font-medium">Add New Crop</h1>
        <div className="flex flex-wrap justify-between gap-24 sections">
          <div className="info flex-1 flex flex-col gap-3 justify-between">
            <label className="text-lg  text-gray-600" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              name='title'
              placeholder="e.g. name of my crop"
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-md"
            />

            <label  className="text-lg  text-gray-600" htmlFor="category">Category</label>
            <select
            id="cat"
            name="cat"
            defaultValue="Cereal"
            onChange={handleChange}
            className="p-4 border-2 border-gray-300 rounded-md"
          >
            <option value="Cereal">Cereal Crops</option>
            <option value="Pulse">Pulse Crops</option>
            <option value="Oilseed">Oilseed Crops</option>
            <option value="Fruit">Fruit Crops</option>
            <option value="Fruit">Others</option>
          </select>
            <div className="images ">
              <div className="imagesInputs flex flex-col">

            <label className="text-lg  text-gray-600" htmlFor="coverImage">Cover Image</label>
            <input id="coverImage" type="file" onChange={(e) => setSingleFile(e.target.files[0])} className="p-4 " />

            <label className="text-lg ml-4 text-gray-600" htmlFor="uploadImages">Upload Images</label>
            <input id="uploadImages" type="file"  multiple
                  onChange={(e) => setFiles(e.target.files)}className="p-4" />
                  </div>
              <button className='bg-green-500 p-4 rounded-md text-white font-semibold  ' onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>



            <label className="text-lg  text-gray-600" htmlFor="description">Description</label>
            <textarea
             name="desc"
              id="description"
              placeholder="Brief descriptions about your crop"
              rows="12"
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-md"
            ></textarea>

            <button onClick={handleSubmit} className="bg-green-500 p-4 rounded-md text-white font-semibold">Create</button>
          </div>

          <div className="details flex-1 flex flex-col gap-3 justify-between">
            <label className="text-lg  text-gray-600" htmlFor="serviceTitle">Speciality</label>
            <input
               name="shortTitle"
              type="text"
              onChange={handleChange}
              placeholder="e.g. organic farming"
              className="p-4 border-2 border-gray-300 rounded-md"
            />

            <label className="text-lg  text-gray-600" htmlFor="shortDescription">Short Description</label>
            <textarea
             name="shortDesc"
             onChange={handleChange}
              id="shortDescription"
              placeholder="Short description of your crop"
              rows="10"
              className="p-4 border-2 border-gray-300 rounded-md"
            ></textarea>

            <label className="text-lg  text-gray-600" htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} id="deliveryTime" className="p-4 border-2 border-gray-300 rounded-md" />
            

            <label className="text-lg  text-gray-600" htmlFor="revisionNumber">Return-policy</label>
            <select
             id="revisionNumber"
              name="cats"
              className="p-4 border-2 border-gray-300 rounded-md"
            >
              <option value="Cereal">Yes</option>
              <option value="Pulse">No</option>
              
            </select>

            <label className="text-lg  text-gray-600" htmlFor="addFeatures">Key Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button className='bg-green-500 p-2 ml-1 rounded-md text-white font-semibold' type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    className='bg-green-500 p-2 rounded-md text-white font-semibold'
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span className='ml-1'>X</span>
                  </button>
                </div>
              ))}
            </div>
            {/* <input id="addFeatures" type="text" placeholder="e.g. Top-quality seeds" className="p-4 border-2 border-gray-300 rounded-md" />
            <input id="addFeatures" type="text" placeholder="e.g. fertilizers less" className="p-4 border-2 border-gray-300 rounded-md" />
            <input id="addFeatures" type="text" placeholder="e.g. organic farming" className="p-4 border-2 border-gray-300 rounded-md" />
            <input id="addFeatures" type="text" placeholder="e.g. days to grow" className="p-4 border-2 border-gray-300 rounded-md" /> */}

            <label className="text-lg  text-gray-600" htmlFor="price">Price</label>
            <input id="price" name="price" onChange={handleChange}  type="number" className="p-4 border-2 border-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;