import {
  Modal,
  Button,
  Box,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authS } from "../../redux/selector";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { createGroup } from "../../api";
import { addGroup } from "../../redux/slice/groupSlice";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  with: "400px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function CreateGroupPage() {
  const navigate = useNavigate();
  const user = useSelector(authS).user;
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState(
    `This is ${user.lastName}'s group`
  );
  const [firstSubmit, setFirstSubmit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const mutation = useMutation(createGroup, {
    onSuccess: (data) => {
      let group = data.data.group;
      group.ownerData = user;
      dispatch(addGroup(group));
      navigate(`/groups/${data.data.group._id}`);
      setOpen(false);
    },
    onError: (error) => {
      if (error.response) {
        const { data } = error.response;
        enqueueSnackbar(JSON.stringify(data), { variant: "error" });
      }
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    handleOpen();
  }, []);
  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    //setOpen(false);
    navigate("/groups/mygroups");
  };
  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstSubmit(true);
    if (groupName === "") return;
    // Xử lý việc tạo nhóm mới
    const newGroup = {
      name: groupName,
      description: groupDescription,
      members: [user._id],
      owner: user._id,
      coowner: [],
    };
    mutation.mutate(newGroup);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ ...style }}>
        <h2 id="simple-modal-title">Create new group</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              width={"50%"}
              fontSize={14}
              fontStyle={"italic"}
              fontWeight={"bold"}
            >
              Group Name:
            </Typography>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Name"
                value={groupName}
                size="small"
                onChange={(event) => setGroupName(event.target.value)}
              />
              <FormHelperText error={groupName === "" && firstSubmit}>
                {groupName === "" && firstSubmit
                  ? "*Group name is required"
                  : ""}
              </FormHelperText>
            </FormControl>
          </div>
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              width={"50%"}
              fontSize={14}
              fontStyle={"italic"}
              fontWeight={"bold"}
            >
              Group Description:
            </Typography>
            <FormControl fullWidth>
              <OutlinedInput
                size="small"
                placeholder="Description"
                value={groupDescription}
                onChange={(event) => setGroupDescription(event.target.value)}
              />
              {/* <FormHelperText error={groupDescription === ""}>
              {groupDescription === "" ? "Description is required" : ""}
            </FormHelperText> */}
            </FormControl>
          </div>
          <br />
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: 100,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#e0e0e0",
                color: "black",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  color: "black",
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: 100,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#0b5c6d",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0b5c6d",
                  color: "white",
                },
              }}
            >
              Create
            </Button>
          </div>
        </form>
        <Backdrop open={mutation.isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
}
export default CreateGroupPage;
