import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Create, Form, useCreate } from "react-admin";
import { useEffect } from "react";

const RegisterForm = ({ setValue }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      // username: "test2",
      // first_name: "test",
      // last_name: "lastname",
      // password: "heyyou12",
      // password2: "heyyou12",
      // email: "me@me.com",
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
      email: "",
    },
  });

  const [create, { data, isLoading, error }] = useCreate();

  const onSubmit = (data) => {
    create(
      "register",
      { data },
      {
        disableAuthentication: true,
        onSuccess: () => {
          setValue(0);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} style={{ width: "300px", padding: "16px" }}>
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField {...field} size="small" label={field.name} />
            )}
          />
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextField {...field} size="small" label={field.name} />
            )}
          />
        </Stack>
        <Stack spacing={2}>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <TextField {...field} size="small" label={field.name} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} size="small" label={field.name} />
            )}
          />
        </Stack>
        <Stack spacing={2}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                {...field}
                size="small"
                label={"Password"}
              />
            )}
          />
          <Controller
            name="password2"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                {...field}
                size="small"
                label={"Confirm Password"}
              />
            )}
          />
        </Stack>
        <Button type="submit" variant="contained">
          Sign up
        </Button>
        {isLoading && (
          <CircularProgress
            sx={{ marginRight: 1 }}
            size={18}
            thickness={2}
            color="success"
          />
        )}
        {error && error.status !== 201 && (
          <p style={{ color: "red" }}>An error occurred: {error.message}</p>
        )}
      </Stack>
    </form>
  );
};

export default RegisterForm;
