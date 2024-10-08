import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { Card } from "../Card";
import { CardLink } from "../CardLink";
import { CardTitle } from "../CardTitle";
import { InputField } from "../InputField";
import { useSignInMutation } from "../../hooks/useSignInMutation";
import { theme } from "../../theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ISignInFormInput, signInSchema } from "./validationSchemas/SignInForm";
import toast from "react-hot-toast";

export const SignInForm = () => {
  const { signIn, loading } = useSignInMutation();
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInFormInput>({ resolver: yupResolver(signInSchema) });

  const onSubmit: SubmitHandler<ISignInFormInput> = (inputData) => {
    const input = {
      username: inputData.username,
      password: inputData.password,
    };
    signIn({
      variables: { input },
      onCompleted: (data) => {
        localStorage.removeItem("token");
        if (data) {
          localStorage.setItem("token", data?.logIn?.viewer?.sessionToken);
          navigate("/chats");
        }
      },
      onError: (error) => {
        toast.error(error.message);
        toast("Beware, the username is case sensitive!", {
          icon: "👀",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div style={{ width: "100%" }}>
          <CardTitle>Login</CardTitle>
        </div>
        <InputField
          id="username"
          type="text"
          placeholder="Username"
          label="Username"
          register={register("username")}
          errorMessage={errors.username?.message}
        />
        <InputField
          id="password"
          type="password"
          placeholder="Password"
          label="Password"
          register={register("password")}
          errorMessage={errors.password?.message}
        />
        <Button color={theme.colors.cta} type="submit" disabled={loading} >
          Login
        </Button>
        <div
          style={{
            padding: `${theme.padding.small} 0`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.flexGap.medium,
          }}
        >
          <Link to="/sign-up">
            <CardLink selected={true}>Sign up</CardLink>
          </Link>
          <Link to="/forgot-password">
            <CardLink selected={true}>Forgot Password?</CardLink>
          </Link>
        </div>
      </Card>
    </form>
  );
};
