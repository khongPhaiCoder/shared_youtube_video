import React, { useCallback } from "react";
import { Inputs, ShareVideoFormProps } from "./ShareVideoForm.types";
import { Button, Container } from "@/components/atoms";
import { TextField } from "@/components/molecules";
import { useI18n } from "next-localization";
import { LANG } from "@/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { getYouTubeInfo } from "@/utils/youtubeapi";

const ShareVideoForm: React.FC<ShareVideoFormProps> = ({
  onAddSharedVideo,
}) => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    reset,
    getValues,
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
      const response = await getYouTubeInfo(data.url!);
      const embedId = response?.embedId;
      const title = response?.title;
      const thumbnailUrl = response?.thumbnailUrl;

      onAddSharedVideo(embedId, title, thumbnailUrl);

      reset();
    } catch (err) {
      setError("url", {
        type: "custom",
        message: "Please enter a valid youtube video URL!",
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Container
        display="flex"
        gap="12px"
        xsPadding="8px 20px"
        lgPadding="12px 0px"
      >
        <TextField
          label="Youtube Video URL"
          error={!!errors?.url}
          helperText={!!errors?.url ? errors?.url.message : ""}
          value={getValues("url")}
          {...register("url", {
            onChange: onChangeHandler.bind(null, "url"),
            required: true,
            pattern: {
              value:
                /^(?:https?:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/))(.*?)(?:\?.*|)$/,
              message: "Please enter a valid youtube video URL!",
            },
          })}
        />
        <Button type="submit" styles={{ height: "56px" }}>
          {t(LANG.SUBMIT)}
        </Button>
      </Container>
    </form>
  );
};

export default ShareVideoForm;
