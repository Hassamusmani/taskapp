import { useState, useEffect } from "react";
import { Box, Flex, Heading, Spacer, IconButton } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TasksResponseData } from "../types/taskTypes";
import { selectTaskEdited, selectTaskDeleted } from "../selector/tasksSelector";
import { useSelector } from "react-redux";
import { actions } from "../slice/taskSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";

type Props = {
  task: TasksResponseData;
};

const ListItem = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const taskEdited = useSelector(selectTaskEdited);
  const taskDeleted = useSelector(selectTaskDeleted);

  function handleEditClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsModalOpen(true);
  }

  const handleClose = () => {
    setIsModalOpen(false);
  }

  function handleDeleteClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
    e.stopPropagation();
    dispatch(actions.deleteTask({id}));
  }

  useEffect(() => {
    if (taskEdited) {
      handleClose();
    }
    if (taskDeleted) {
      dispatch(actions.resetTaskDeleted());
    }
  }, [taskEdited, taskDeleted]);

  return (
    <>
      <Box onClick={() => navigate(`/detail/${task.id}`)}>
        <Box
          key={task.id}
          p={15}
          borderBottom="1px solid #E2E8F0"
          _hover={{
            background: "#f0f7fd",
            color: "black",
          }}
          transition="all 0.2s ease-in-out"
          cursor="pointer"
        >
          <Flex alignItems="center">
            <Box mr={2} flexShrink={0}>
              <Heading as="h2" size="md">
                {task.title}
              </Heading>
            </Box>
            <Spacer />
            <Box ml={2} display="flex" alignItems="center">
              <IconButton
                size='lg'
                aria-label="Edit Task"
                icon={<AiOutlineEdit />}
                mr={2}
                variant="outlined"
                fontSize='20px'
                onClick={(e) => handleEditClick(e)}
              />
              <IconButton
                size='lg'
                aria-label="Delete Task"
                icon={<AiOutlineDelete />}
                onClick={(e) => handleDeleteClick(e, task.id || 0)}
                variant="outlined"
                fontSize='20px'
              />
            </Box>
          </Flex>
        </Box>
      </Box>
      {isModalOpen ? <EditModal task={task} handleClose={handleClose} /> : null}
    </>
  );
};


export default ListItem;