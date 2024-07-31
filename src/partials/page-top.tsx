import { useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { GuestRoute } from "../router";
import { AuthContext, TasksContext } from "../context";
import { Confirmation } from "../hooks/confirmation";
import { Button } from "../components/button/main";
import { Input } from "../components/form/input";
import { Icon } from "../components/icon/main";
import { FlexBox } from "../components/layout/styled";
import { Void } from "../utils/helpers";
import { createTask } from "../tasks/crud";
import { TasksOwner } from "../tasks/access";
import { StyledShareLink } from "./styled";
import { FieldComponent } from "../components/form/field";

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
                Confirmation.prompt(() => <ShareLink link={shareLink} />, {
                  title: "Share tasks",
                }).catch(Void);
              }}
            >
              <Icon name="link" />
            </Button>
          )}
        </FlexBox>
        <FlexBox size={"none"}>
          <FieldComponent
            id="search"
            iconName="magnifying-glass"
            variant="primary"
            noLabel
          >
            <Input
              id="search"
              fullWidth
              placeholder="Search"
              defaultValue={search}
              onChange={setSearch}
            />
          </FieldComponent>
        </FlexBox>
      </FlexBox>
      <TasksOwner>
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
      </TasksOwner>
    </>
  );
}

export function ShareLink(args: { link: string }) {
  const { link } = args;
  const [copied, setCopied] = useState<boolean>();

  useEffect(() => {
    if (!copied) return;
    const reset = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => {
      clearTimeout(reset);
    };
  }, [copied]);

  return (
    <StyledShareLink padding={"0.5rem"}>
      <FlexBox size={1} margin={"0.5rem"}>
        <Input variant="primary" readOnly fullWidth defaultValue={link} />
      </FlexBox>
      <FlexBox size={"none"} margin={"0.5rem"}>
        <Button
          variant="primary"
          onClick={() => {
            navigator.clipboard.writeText(link);
            setCopied(true);
          }}
        >
          <Icon name="copy" />
          <label>{copied ? "Link Copied" : "Copy Link"}</label>
        </Button>
      </FlexBox>
    </StyledShareLink>
  );
}
