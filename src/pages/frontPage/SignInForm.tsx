import React from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { InputField } from "../../components/InputField";
import { theme } from "../../components/theme";
import { forms } from "./FormContainer";

export const SignInForm = ({
  setForm,
}: {
  setForm: (value: forms) => void;
}) => (
  <Card width="300px">
    <InputField id="username" type="text" placeholder="Username" />
    <InputField id="password" type="password" placeholder="Password" />
    <Button color={theme.colors.cta}>Login</Button>
    <p onClick={() => setForm(forms.SignUp)} style={theme.link}>
      Sign up
    </p>
    <p onClick={() => setForm(forms.ForgotPassword)} style={theme.link}>
      Forgot Password?
    </p>
  </Card>
);
