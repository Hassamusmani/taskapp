import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  Switch,
} from '@chakra-ui/react';
import { actions } from '../slice/taskSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectTaskAdded, selectTaskEdited } from '../selector/tasksSelector';
import { TasksResponseData } from '../types/taskTypes';

type TaskFormValues = {
  title: string;
  description: string;
  validFrom: string;
  validTo: string;
  category: string;
  isActive: boolean;
};

const schema = yup.object().shape({
  title: yup.string().required().max(100),
  description: yup.string().max(1000),
  validFrom: yup.date().required(),
  validTo: yup.date().required().min(yup.ref('validFrom')),
  category: yup.string().required(),
});

type Props = {
  modal?: boolean;
  task?: TasksResponseData | null;
};

const options = [
  { value: 'FATO', label: 'FATO' },
  { value: 'STAND', label: 'STAND' },
  { value: 'OVERTHINKING', label: 'OVERTHINKING' },
];

const TaskForm = (props: Props) => {
  const dispatch = useDispatch();
  const taskAdded = useSelector(selectTaskAdded);
  const taskEdited = useSelector(selectTaskEdited);
  
  const { modal, task } = props;
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<TaskFormValues>({
    resolver: yupResolver(schema),
    ...(task && { defaultValues: task }),
  });

  const formatDate = (date: string) => {
    const validFromDate = new Date(date);
    const year = validFromDate.getFullYear();
    const month = String(validFromDate.getMonth() + 1).padStart(2, '0');
    const day = String(validFromDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatObject = (values: TaskFormValues) => {
    const validFromStr = values.validFrom;
    const validToStr = values.validTo;

    return {
      task: {
        ...values,
        validFrom: formatDate(validFromStr),
        validTo: formatDate(validToStr),
      },
    };
  };

  const onSubmit = async (values: TaskFormValues) => {
    setSubmitting(true);

    // Submit the form to your API or backend here
    const finalObj = formatObject(values);

    if (modal) {
      dispatch(actions.editTask(finalObj));
    } else {
      dispatch(actions.addTask(finalObj));
    }
  };

  useEffect(() => {
    if (taskAdded) {
      setShowForm(false);
    }
    if (taskAdded || taskEdited) {
      reset();
      setSubmitting(false);
    }
    dispatch(actions.resetTaskAdded());
    dispatch(actions.resetTaskEdited());
  }, [taskAdded, taskEdited]);

  return (
    <>
      {showForm || modal ? <Box p={4} bg="#f0f7fd">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.title} width="100%">
            <FormLabel htmlFor="title">Title *</FormLabel>
            <Input bg="white" id="title" {...register('title')} />
            <FormErrorMessage fontSize="10px" color="red">{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description} mt={4} width="100%">
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea bg="white" id="description" {...register('description')} />
            <FormErrorMessage fontSize="10px" color="red">{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <Flex justify="space-between" mt={4}>
            <FormControl isInvalid={!!errors.validFrom} width="48%">
              <FormLabel htmlFor="validFrom">Valid From *</FormLabel>
              <Input bg="white" type="date" id="validFrom" {...register('validFrom')} />
              <FormErrorMessage fontSize="10px" color="red">{errors.validFrom?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.validTo} width="48%">
              <FormLabel htmlFor="validTo">Valid To *</FormLabel>
              <Input bg="white" type="date" id="validTo" {...register('validTo')} />
              <FormErrorMessage fontSize="10px" color="red">{errors.validTo?.message}</FormErrorMessage>
            </FormControl>
          </Flex>
          <Flex justify="space-between" mt={4}>
            <FormControl isInvalid={!!errors.category} width="48%">
              <FormLabel htmlFor="category">Category *</FormLabel>
              <Select
                bg="white"
                placeholder="Select category"
                id="category"
                {...register('category')}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage fontSize="10px" color="red">{errors.category?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} width="48%">
              <FormLabel htmlFor="isActive">Is Active</FormLabel>
              <Controller
                name="isActive"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Switch
                    id={name}
                    onChange={(e) => onChange(e.target.checked)}
                    onBlur={onBlur}
                    value={value.toString()}
                    ref={ref}
                    defaultChecked
                  />
                )}
              />
            </FormControl>
          </Flex>
          <Flex justify="space-between" mt={4}>
            <Button
              type="submit"
              colorScheme="blue"
              mt={4}
              isLoading={submitting}
              loadingText="Submitting..."
              alignSelf="left"
              width="48%"
            >
              {modal ? 'Edit Task' : 'Add Task'}
            </Button>
            {!modal ? <Button
              type="button"
              colorScheme="red"
              mt={4}
              alignSelf="left"
              width="48%"
              onClick={() => setShowForm(!showForm)}
            >
              Cancel
            </Button> : null}
          </Flex>
        </form>
      </Box>
        : <Button
          w="100%"
          type="button"
          colorScheme="blue"
          mt={4}
          alignSelf="left"
          onClick={() => setShowForm(!showForm)}
        >
          Add Task
        </Button>}</>
  );
};

export default TaskForm;