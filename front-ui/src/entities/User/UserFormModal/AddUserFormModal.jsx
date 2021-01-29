import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalForm, CInput } from "application/components";
import { userService } from "infraestructure/services";

const formSchema = object().shape({
  name: string().required("Required"),
});

const defaultValues = {
  name: "",
};

const AddUserFormModal = ({ visible, onClose, isNewUser }) => {
  const { control, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const [loading, setLoading] = useState(false);

  const { isDirty } = formState;
  const onSubmit = (aa) => {
    setLoading(true);
    userService.save(aa).then(() => {
      setLoading(false);
    });
  };

  return (
    <ModalForm
      visible={visible}
      title={isNewUser ? "Add new User" : "Update User"}
      onClose={() => onClose(isDirty)}
      onCancel={() => onClose(isDirty)}
      onConfirm={handleSubmit(onSubmit)}
      disabled={loading}
      loading={loading}
    >
      <CInput name="name" label="Names*" control={control} errors={errors} />
    </ModalForm>
  );
};

export default AddUserFormModal;
