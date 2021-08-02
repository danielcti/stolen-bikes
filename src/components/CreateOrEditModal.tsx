import { useState } from "react";
import Modal, { Styles } from "react-modal";
import axios from "axios";
import Bike from "../utils/Bike";
import { useEffect } from "react";
import randomImage from "../utils/randomImage";

interface CreateOrEditModalProps {
  modalIsOpen: boolean;
  setIsOpen(opened: boolean): void;
  updateList(): void;
  isCreate: boolean;
  payload: Bike;
}

const customStyles: Styles = {
  overlay: {
    zIndex: 50,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "50px 80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

Modal.setAppElement("#__next");

function CreateOrEditModal({
  modalIsOpen,
  setIsOpen,
  updateList,
  isCreate,
  payload,
}: CreateOrEditModalProps) {
  const [title, setTitle] = useState("");
  const [thiefDescription, setThiefDescription] = useState("");
  const [frameColors, setFrameColors] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [stolenLocation, setStolenLocation] = useState("");

  useEffect(() => {
    setTitle(payload?.title);
    setThiefDescription(payload?.thief_description);
    setFrameColors(payload?.frame_colors);
    setFrameSize(payload?.frame_size);
    setStolenLocation(payload?.stolen_location);
  },[payload])

  async function createOrEditBike() {
    if (isCreate) {
      const { lat, lon } = (
        await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${stolenLocation}`
        )
      ).data[0];
      const response = await axios.post(`http://localhost:3000/api/bikes`, {
        title,
        thief_description: thiefDescription,
        frame_colors: frameColors,
        frame_size: frameSize,
        stolen_location: stolenLocation,
        latitude: lat,
        longitude: lon,
        stolen: true,
        date_stolen: Math.floor(new Date().getTime() / 1000),
        large_img: randomImage()
      });
      if (response?.status === 200) {
        console.log("Bike created.");
        updateList();
      } else {
        console.log("Oops. Try again later.");
      }
    } else {
      const { lat, lon } = (
        await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${stolenLocation}`
        )
      ).data[0];
      const response = await axios.put(`http://localhost:3000/api/bikes/${payload?._id}`, {
        title,
        thief_description: thiefDescription,
        frame_colors: frameColors,
        frame_size: frameSize,
        stolen_location: stolenLocation,
        latitude: lat,
        longitude: lon,
        stolen: true,
      });
      if (response?.status === 204) {
        console.log("Bike updated.");
        updateList();
      } else {
        console.log("Oops. Try again later.");
      }
    }

    setIsOpen(false);
  }

  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <div className="flex flex-col">
        <input
          className="rounded bg-gray-600 text-indigo-50 my-2 px-4 py-2"
          placeholder="Bike title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="rounded bg-gray-600 text-indigo-50 my-2 px-4 py-2"
          placeholder="Thief description"
          type="text"
          value={thiefDescription}
          onChange={(e) => setThiefDescription(e.target.value)}
        />
        <input
          className="rounded bg-gray-600 text-indigo-50 my-2 px-4 py-2"
          placeholder="Frame colors"
          type="text"
          value={frameColors}
          onChange={(e) => setFrameColors(e.target.value)}
        />
        <input
          className="rounded bg-gray-600 text-indigo-50 my-2 px-4 py-2"
          placeholder="Frame size"
          type="text"
          value={frameSize}
          onChange={(e) => setFrameSize(e.target.value)}
        />
        <input
          className="rounded bg-gray-600 text-indigo-50 my-2 px-4 py-2"
          placeholder="Location"
          type="text"
          value={stolenLocation}
          onChange={(e) => setStolenLocation(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button
          className="mx-5 px-4 py-2 bg-blue-600 rounded text-indigo-50"
          onClick={() => createOrEditBike()}
        >
          Submit
        </button>
        <button
          className="mx-5 px-4 py-2 bg-red-500 rounded text-indigo-50"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default CreateOrEditModal;
