import React, { useMemo, useCallback } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { ListBonita, IconButton } from "application/components";
import { useConfirmation } from "application/hooks";
import { taskService } from "infraestructure/services";

const headerTitles = ["ID", "Description", "State", "Actions"];

const TaskListByUser = ({ userId, setVisible, records }) => {
  const confirm = useConfirmation();
  const handleRemove = useCallback(
    (id) => {
      confirm({
        header: "Delete task",
        message: `Are you sure you want to delete task: `,
        yes: () => {
          taskService.deleteById(id).then(() => {
            alert("yaah")
          })
        },
      });
    },
    [confirm]
  );

  const recordsMapped = useMemo(
    () =>
      records.map(({ _id, description, state }) => ({
        id: _id,
        description,
        state,
        actions: (
          <div>
            <IconButton
              icon={EditIcon}
              onClick={() => setVisible(true)}
              color="nocolor"
            />
            <IconButton
              icon={DeleteForeverIcon}
              onClick={() => handleRemove(_id)}
              color="nocolor"
            />
          </div>
        ),
      })),
    [records, handleRemove, setVisible]
  );

  return (
    <>
      <ListBonita records={recordsMapped} headerTitles={headerTitles} />
    </>
  );
};

export default TaskListByUser;
