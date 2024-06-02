import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Form } from "react-router-dom";

const DropdownPortal = () => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
        <DropdownMenu.Item className="DropdownMenuItem">
          <Form action="logout" method="post">
            <button>Logout</button>
          </Form>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

export default DropdownPortal;
