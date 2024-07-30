import { useContext } from "react";
import { Button } from "../components/button/main";
import { Input } from "../components/form/input";
import { Icon } from "../components/icon/main";
import { FlexBox } from "../components/layout/styled";
import { createTask } from "../tasks/crud";
import { TasksContext } from "../hooks/tasks";
import { AuthContext } from "../hooks/auth";
import { GuestRoute } from "../router";
import { generatePath } from "react-router-dom";
import { Confirmation } from "../hooks/confirmation";
import { Void } from "../utils/helpers";
import { StyledShareLink } from "./styled";

export function PageTop() {
  const { user, guestUserId } = useContext(AuthContext);
  const { search, addTask, setSearch } = useContext(TasksContext);

  const shareLink =
    GuestRoute.path &&
    `${window.location.origin}${generatePath(GuestRoute.path, {
      guestUserId: user?.userId || guestUserId,
    })}`;

  return (
    <>
      <FlexBox
        size={"none"}
        display="flex"
        flexDirection="row"
        mobileDirection="column"
        margin="2rem 0"
      >
        <FlexBox as="h2" size={1} margin="0">
          My Tasks for next month
          {shareLink && (
            <Button
              outlined
              slim
              variant="primary"
              onClick={() => {
                Confirmation.prompt(
                  () => {
                    return (
                      <StyledShareLink padding={"0.5rem"}>
                        <FlexBox size={1} margin={"0.5rem"}>
                          <Input readOnly defaultValue={shareLink} />
                        </FlexBox>
                        <FlexBox size={"none"} margin={"0.5rem"}>
                          <Button
                            variant="primary"
                            onClick={() => {
                              navigator.clipboard.writeText(shareLink);
                            }}
                          >
                            <Icon name="copy" />
                            <label>Copy</label>
                          </Button>
                        </FlexBox>
                      </StyledShareLink>
                    );
                  },
                  { title: "Share tasks" }
                ).catch(Void);
              }}
            >
              <Icon name="link" />
            </Button>
          )}
        </FlexBox>
        <FlexBox size={"none"}>
          <Input
            placeholder="Search"
            defaultValue={search}
            onChange={setSearch}
          />
        </FlexBox>
      </FlexBox>
      {user && (
        <FlexBox size={"none"} margin="1rem 0">
          <Button
            variant="primary"
            onClick={() => {
              createTask({ name: "" }).then(addTask);
            }}
          >
            <Icon name="plus" />
            <label>Add task</label>
          </Button>
        </FlexBox>
      )}
    </>
  );
}
