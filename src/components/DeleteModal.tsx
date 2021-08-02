import Modal, { Styles } from "react-modal";
import axios from "axios";

interface DeleteModalProps {
  id: string;
  modalIsOpen: boolean;
  setIsOpen(opened: boolean): void;
  updateList(): void;
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
    height: 200,
  },
};

Modal.setAppElement("#__next");

function DeleteModal({
  id,
  modalIsOpen,
  setIsOpen,
  updateList,
}: DeleteModalProps) {
  async function removeBike() {
    let response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/bikes/${id}`);
    if (response?.status === 200) {
      console.log("Bike deleted.");
      updateList();
    } else {
      console.log("Oops. Try again later.");
    }
    setIsOpen(false);
  }

  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <h2 className="font-bold text-lg">
        Are you sure that you want to delete this bike?
      </h2>
      <div className="mt-4">
        <button
          className="mx-5 px-4 py-2 bg-blue-600 rounded text-indigo-50"
          onClick={() => removeBike()}
        >
          Yes
        </button>
        <button
          className="mx-5 px-4 py-2 bg-red-500 rounded text-indigo-50"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          No
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
