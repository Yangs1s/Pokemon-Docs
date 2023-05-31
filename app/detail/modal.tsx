/** @format */

import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
type ModalType = {
  id: string;
  description: string;
  setModal: Dispatch<SetStateAction<boolean>>;
};
const Modal = ({ id, description, setModal }: ModalType) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id={id}
      onClick={() => {
        setModal(false);
      }}
      className="absolute -top-[100%] left-0 bg-white w-full h-full border-2 border-gray-600 rounded-lg p-3 z-30"
    >
      {description}
    </motion.div>
  );
};

export default Modal;
