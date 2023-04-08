import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks } from "../selector/tasksSelector";
import { actions } from "../slice/taskSlice";
import ListItem from "../components/ListItem";
import { TasksResponseData } from "../types/taskTypes";
import TaskForm from "../components/TaskForm";

const ListPage = () => {
  const dispatch = useDispatch();
  const allTasks: TasksResponseData[] = useSelector(selectTasks);

  useEffect(() => {
    if (!allTasks.length) {
      dispatch(actions.getTasks());
    }
  }, []);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box
        width="60%"
        borderRadius="md"
        bg="white"
        boxShadow="md"
        p={6}
        overflow="hidden"
      >
        <TaskForm />
        {allTasks?.map((task) => (
          <ListItem key={task.id} task={task} />
        ))}
      </Box>
    </Flex>
  );
}

export default ListPage;