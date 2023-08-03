import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Create, Form, useCreate } from "react-admin";

const RegisterForm = () => {
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
    console.log(data);
    create("register", { data }, { disableAuthentication: true });
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
                label={field.name}
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
                label={field.name}
              />
            )}
          />
        </Stack>
        <Button type="submit" variant="contained">
          Sign up
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
