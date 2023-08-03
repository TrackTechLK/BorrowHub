import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const RegisterForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
      email: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => <TextField {...field} size="small" label={field.name} />}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <TextField {...field} size="small" label={field.name} />}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <TextField {...field} size="small" label={field.name} />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField {...field} size="small" label={field.name} />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <TextField {...field} size="small" label={field.name} />}
        />
        <Controller
          name="password2"
          control={control}
          render={({ field }) => <TextField {...field} size="small" label={field.name} />}
        />
        <Button type='submit' variant="contained">Sign up</Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
