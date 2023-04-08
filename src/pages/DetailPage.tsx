import { Box, Heading, Text, Center, Flex, IconButton } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { selectTasks, selectTaskEdited } from "../selector/tasksSelector";
import { useEffect, useState } from "react";
import { TasksResponseData } from "../types/taskTypes";
import { AiOutlineEdit } from "react-icons/ai";
import EditModal from "../components/EditModal";

const DetailPage = () => {
  const { taskid } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allTasks: TasksResponseData[] = useSelector(selectTasks);
  const taskEdited = useSelector(selectTaskEdited);
  const [taskToDisplay, setTaskToDisplay] = useState<TasksResponseData | null>(null);

  function handleEditClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsModalOpen(true);
  }

  function handleClose() {
    console.log("hello");
    setIsModalOpen(false);
  }

  useEffect(() => { 
    if (allTasks.length) {
      const filteredTask = allTasks.find((task) => task.id === Number(taskid));
      setTaskToDisplay(filteredTask || null);
    } else {
      navigate("/");
    }
  }, [allTasks]);

  useEffect(() => {
    if (taskEdited) {
      handleClose();
    }
  }, [taskEdited]);

  return (
    <>
      {taskToDisplay ? 
        <Center minHeight="80vh">
          <Box width="80%" p={8} bg="gray.100" position="relative">
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h1" size="xl" fontWeight="bold">
                {taskToDisplay.title}
              </Heading>
              <IconButton
                icon={<AiOutlineEdit />}
                aria-label="Edit Task"
                size="lg"
                variant="outlined"
                colorScheme="gray"
                fontSize='25px'
                onClick={handleEditClick}
              />
            </Flex>
            <Text fontWeight="bold" mb={2}>
              Description:
            </Text>
            <Text mb={4}>{taskToDisplay.description}</Text>
            <Text fontWeight="bold" mb={2}>
              Valid From:
            </Text>
            <Text mb={4}>{taskToDisplay.validFrom}</Text>
            <Text fontWeight="bold" mb={2}>
              Valid To:
            </Text>
            <Text mb={4}>{taskToDisplay.validTo}</Text>
            <Text fontWeight="bold" mb={2}>
              Category:
            </Text>
            <Text mb={4}>{taskToDisplay.category}</Text>
            <Text fontWeight="bold" mb={2}>
              Is Active:
            </Text>
            <Text mb={0}>{taskToDisplay.isActive ? "Yes" : "No"}</Text>
          </Box>
        </Center>
      : null}
      {isModalOpen ? <EditModal task={taskToDisplay} handleClose={handleClose} /> : null}
    </>
  );
};

export default DetailPage;