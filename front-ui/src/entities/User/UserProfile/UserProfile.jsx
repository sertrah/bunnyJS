import React, { useState, useEffect } from "react";
import TaskListByUser from "entities/Task/TaskListByUser";
import { Button } from "application/components";
import TaskFormModal from "entities/Task/TaskFormModal";
import { userService } from "infraestructure/services";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [visible, setVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    userService.findTaskById(id).then((userResponse) => {
      setUserDetails(userResponse);
    });
  }, [id]);

  return (
    <main className="user-profile--container">
      <article className="user-profile--header">
        <h1>{userDetails?.name}</h1>
        <h3>ID {userDetails?.id}</h3>
      </article>
      <article className="user-profile--content">
        <h2>Task list</h2>
        <Button modifiers={["primary"]} onClick={() => setVisible(true)}>
          Add new task
        </Button>
        {userDetails?.tasks && 
          <TaskListByUser setVisible={() => setVisible(false)} records={userDetails.tasks} />
        }
      </article>
      <TaskFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        userId={id}
        isNewTask
      />
    </main>
  );
};

export default UserProfile;
