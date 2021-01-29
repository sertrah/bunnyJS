import React, { useEffect, useState } from "react";
import { ListBonita, IconButton, Button } from "application/components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { userService } from "infraestructure/services";
import UserFormModal from "../UserFormModal";
import {ROUTER_PATH_LIST} from "application/constants";

const headerTitles = ["ID", "NAME", "Actions"];

const UserList = () => {
  const [visible, setVisible] = useState(false);
  const [userList, setUserList] = useState(false);

  useEffect(() => {
    userService.findAll().then((user) => {
      const userMapped = user.map(({ id, name }) => ({
        id,
        name,
        actions: (
          <IconButton
            icon={ArrowForwardIosIcon}
            linkTo={`${ROUTER_PATH_LIST.user}/${id}`}
            color="nocolor"
          />
        ),
      }));
      setUserList(userMapped);
    });
  }, []);

  return (
    <section>
      <Button modifiers={["primary"]} onClick={() => setVisible(true)}>
        Add new User
      </Button>
      <ListBonita records={userList} headerTitles={headerTitles} />
      <UserFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        isNewUser
      />
    </section>
  );
};

export default UserList;
