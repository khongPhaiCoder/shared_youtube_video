import React, { useCallback } from "react";
import { Inputs, SignUpFormProps } from "./SignUpForm.types";
import { Button, Container } from "@/components/atoms";
import { TextField, TextFieldPassword } from "@/components/molecules";
import { Title } from "./SignUpForm.styled";
import { useI18n } from "next-localization";
import { LANG } from "@/constants";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "@/utils/api";
import { extractKeywordFromErrorMessage } from "@/utils/helper";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AuthFormContainer } from "../LoginForm/LoginForm.styled";

const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
  const { t } = useI18n();
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
  const router = useRouter();

  const onChangeHandler = useCallback(
    (fieldName: keyof Inputs, e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(fieldName, e.target.value);
    },
    [setValue]
  );

  const onSubmitHandler: SubmitHandler<Inputs> = useCallback(async (data) => {
    try {
      const response = await api.post("/auth/signup", data);
      toast.success(t(LANG.SIGN_UP_SUCCESS));
      router.push("/login");
    } catch (err) {
      const keys: string[] = extractKeywordFromErrorMessage(err as string);
      if (keys?.length) {
        keys.map((key) => {
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
      <AuthFormContainer>
        <Title>{t(LANG.SIGN_UP)}</Title>
        <TextField
          label={t(LANG.USERNAME)}
          error={!!errors?.username}
          helperText={!!errors?.username ? errors?.username.message : ""}
          {...register("username", {
            onChange: onChangeHandler.bind(null, "username"),
            required: true,
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long!",
            },
          })}
        />
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
          gap="3px"
          justifyContent="flex-end"
        >
          {t("already_have_account")}{" "}
          <Link href="/login">{t(LANG.LOG_IN)}</Link>
        </Container>
      </AuthFormContainer>
    </form>
  );
};

export default SignUpForm;
