import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import TaskForm from "./TaskForm";
import { TasksResponseData } from "../types/taskTypes";

type Props = {
  task: TasksResponseData | null;
  handleClose: () => void;
};

const EditModal = (props: Props) => {
  const { task, handleClose } = props;

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaskForm modal task={task} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;