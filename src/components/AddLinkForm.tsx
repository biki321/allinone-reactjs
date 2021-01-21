import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { addLink } from "../services";
import { useAuth } from "../contexts/AuthContext";
import { getToken } from "../firebase";

interface PropsI {
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
  forceBit: number;
}

export default function AddLink({ forceRefresh, forceBit }: PropsI) {
  const [dataFields, setFields] = useState({
    url: "",
    note: "",
    remindat: "", //date time
    needRemind: true,
  });

  const { currentUser } = useAuth();

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFields({ ...dataFields, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //notification
    try {
      await getToken();
    } catch (error) {}

    try {
      await addLink(dataFields, currentUser!["auth-token"]);
      forceRefresh((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }

    setFields({
      url: "",
      note: "",
      remindat: "",
      needRemind: true,
    });
  };

  return (
    <div>
      <form onSubmit={async (e) => await onSubmit(e)}>
        <div>
          <TextField
            id="link"
            required
            label="link"
            name="url"
            variant="outlined"
            placeholder="https://www.google.com/"
            size="small"
            value={dataFields["url"]}
            onChange={(e) => onChange(e)}
          />
          <TextField
            id="note"
            label="short note"
            name="note"
            multiline
            rows={3}
            variant="outlined"
            size="small"
            value={dataFields["note"]}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <TextField
            id="datetime-local"
            name="remindat"
            label="remind me at"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            value={dataFields["remindat"]}
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            disableElevation
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
