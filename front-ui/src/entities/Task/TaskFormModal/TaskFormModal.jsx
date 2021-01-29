import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalForm, CInput } from "application/components";
import { taskService } from "infraestructure/services";

const formSchema = object().shape({
  description: string().required("Required"),
  state: string().required("Required"),
});

const defaultValues = {
  description: "",
  state: "",
};

const TaskFormModal = ({ visible, onClose, isNewTask, userId }) => {
  const { control, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const [loading] = useState(false);

  const { isDirty } = formState;
  const onSubmit = (body) => {
    taskService.save({ ...body, user_id: userId }).then(() => {
      console.log("ediiisoosos");
    });
  };

  return (
    <ModalForm
      visible={visible}
      title={isNewTask ? "Add new task" : "Update task"}
      onClose={() => onClose(isDirty)}
      onCancel={() => onClose(isDirty)}
      onConfirm={handleSubmit(onSubmit)}
      disabled={loading}
      loading={loading}
    >
      <CInput
        name="description"
        label="description*"
        control={control}
        errors={errors}
      />
      <CInput name="state" label="state*" control={control} errors={errors} />
    </ModalForm>
  );
};

export default TaskFormModal;
