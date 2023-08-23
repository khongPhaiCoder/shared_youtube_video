import React, { useCallback } from "react";
import { ButtonProps } from "./Button.types";
import {
  ButtonContainer,
  ButtonContent,
  LoadingSpinner,
} from "./Button.styled";
import { Container } from "../Container";
import { parseHtml } from "@/utils/sanitizeHTML";
import { colorsUtils } from "@/utils/colorsUtils";

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  icon: Icon,
  isLoading = false,
  name,
  onClick,
  onMouseEnter,
  onMouseLeave,
  styles: propStyles,
  iconSize = 20,
  type = "button",
  variant = "outlined",
  isLoadingWithText = false,
  sizeLoading = 20,
}) => {
  const onMouseEnterHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    },
    [onMouseEnter]
  );

  const onMouseLeaveHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    },
    [onMouseLeave]
  );

  const renderIcon = useCallback(() => {
    if (!Icon) {
      return <></>;
    }

    if (typeof Icon === "string") {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={Icon} alt={Icon} width={iconSize} height={iconSize} />;
    }

    return (
      <Icon
        width={iconSize}
        height={iconSize}
        fill={
          variant === "contained" ? colorsUtils.white : colorsUtils.darkGray
        }
      />
    );
  }, [Icon, iconSize, variant]);

  const renderButton =
    typeof children === "string" ? (
      <ButtonContent>{parseHtml(children)}</ButtonContent>
    ) : (
      <div>{children}</div>
    );

  return (
    <ButtonContainer
      style={{ ...propStyles }}
      disabled={disabled || isLoading}
      variant={variant}
      onClick={onClick}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      type={type}
      name={name}
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        zIndex={9}
        style={{ gap: "6px" }}
      >
        {isLoading ? (
          <>
            <LoadingSpinner
              buttonVariant={variant}
              size={sizeLoading}
              aria-label="loading-spinner"
            />
            {isLoadingWithText && renderButton}
          </>
        ) : (
          <>
            {!!Icon && renderIcon()}
            {renderButton}
          </>
        )}
      </Container>
    </ButtonContainer>
  );
};

export default Button;
