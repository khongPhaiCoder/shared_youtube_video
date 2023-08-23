import React, { useCallback, useContext } from "react";
import { Inputs, LoginFormProps, Response } from "./LoginForm.types";
import { Button, Container } from "@/components/atoms";
import { TextField, TextFieldPassword } from "@/components/molecules";
import { AuthFormContainer, Title } from "./LoginForm.styled";
import { useI18n } from "next-localization";
import { LANG } from "@/constants";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "@/utils/api";
import { extractKeywordFromErrorMessage } from "@/utils/helper";
import { AuthContext } from "@/contexts/authContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { t } = useI18n();
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    mode: "onBlur",
    shouldUnregister: true,
  });

  const onChangeHandler = useCallback(
    (fieldName: keyof Inputs, e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(fieldName, e.target.value);
    },
    [setValue]
  );

  const onSubmitHandler: SubmitHandler<Inputs> = useCallback(async (data) => {
    try {
      const response: Response = await api.post("/auth/login", data);
      toast.success(t(LANG.LOG_IN_SUCCESS));
      login(response.user, response.accessToken);
      router.push("/");
    } catch (err) {
      const keys: string[] = extractKeywordFromErrorMessage(err as string);
      if (keys.length) {
        keys.map((key: string) => {
          setError(key as keyof Inputs, {
            type: "custom",
            message: err as string,
          });
        });
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <AuthFormContainer >
        <Title>{t(LANG.LOG_IN)}</Title>
        <TextField
          label={t(LANG.EMAIL)}
          error={!!errors?.email}
          helperText={!!errors?.email ? errors?.email.message : ""}
          {...register("email", {
            onChange: onChangeHandler.bind(null, "email"),
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email!",
            },
          })}
        />
        <TextFieldPassword
          label={t(LANG.PASSWORD)}
          error={!!errors?.password}
          helperText={!!errors?.password ? errors?.password.message : ""}
          {...register("password", {
            onChange: onChangeHandler.bind(null, "password"),
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long!",
            },
          })}
        />
        <Button type="submit" styles={{ width: "100%" }}>
          {t(LANG.SUBMIT)}
        </Button>
        <Container
          display="flex"
          width="100%"
          gap="4px"
          justifyContent="flex-end"
        >
          {t("already_have_account")}
          <Link href="/signup">{t(LANG.SIGN_UP)}</Link>
        </Container>
      </AuthFormContainer>
    </form>
  );
};

export default LoginForm;
