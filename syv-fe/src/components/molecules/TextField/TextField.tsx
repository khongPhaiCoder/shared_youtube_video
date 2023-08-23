import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { TextFieldProps } from "./TextField.types";
import {
  DefaultFormControl,
  DefaultTextInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
} from "./TextField.styled";
import { v4 } from "uuid";

const TextField: React.FC<MuiTextFieldProps & TextFieldProps> = ({
  onChange,
  adornmentEndLabel,
  adornmentFrontLabel,
  description,
  disabled,
  error,
  helperText,
  isDefaultShrink = false,
  label,
  name = v4(),
  onBlur,
  placeholder,
  sizeTextField,
  value = "",
  size,
  type = "text",
  htmlAttributes,
  maxLength,
  rowsMax,
  required,
  style,
  onFocus,
  ...props
}) => {
  const [fieldValue, setFieldValue] = useState<string>(value);
  const [isShrink, setIsShrink] = useState<boolean>(false);

  useEffect(() => {
    if (isDefaultShrink) {
      setIsShrink(isDefaultShrink);
    }
  }, [isDefaultShrink]);

  useEffect(() => {
    if (!isDefaultShrink) {
      setIsShrink(!!fieldValue);
    }
  }, [fieldValue, isDefaultShrink]);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFieldValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  const onFocusHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsShrink(true);

      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const onBlurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!fieldValue) {
        setIsShrink(false);
      }

      if (onBlur) {
        onBlur(e);
      }
    },
    [fieldValue, onBlur]
  );

  const height = useMemo(() => {
    if (sizeTextField?.height) {
      return sizeTextField.height;
    }
    if (size === "small") {
      return 40;
    }
    if (size === "medium") {
      return 48;
    }
    return 56;
  }, [size, sizeTextField?.height]);

  const labelOffset = useMemo(() => {
    let offset = (height - 16 - 40) / 2;

    if (props.variant === "filled" && isShrink) {
      offset -= 16;
    }

    if (props.variant === "standard") {
      offset += 16;
    }

    return offset;
  }, [height, props.variant, isShrink]);

  const InputLabelProps = useMemo(
    () => ({
      style: {
        top: `${labelOffset}px`,
      },
      shrink: isShrink,
    }),
    [labelOffset, isShrink]
  );

  const inputStyle = useMemo<CSSProperties>(
    () => ({
      height,
      padding: !!adornmentFrontLabel
        ? "0 14px 0 0"
        : props.variant === "standard"
        ? 0
        : "0 14px",
    }),
    [height, adornmentFrontLabel, props.variant]
  );

  const InputProp = useMemo(
    () => ({
      startAdornment: adornmentFrontLabel && (
        <InputAdornment position="start">{adornmentFrontLabel}</InputAdornment>
      ),
      endAdornment: adornmentEndLabel && (
        <InputAdornment position="end">{adornmentEndLabel}</InputAdornment>
      ),
    }),
    [adornmentFrontLabel, adornmentEndLabel]
  );

  const styleTextProps = useMemo(
    () => ({
      type: type, // set html input type
      label: placeholder || !!adornmentFrontLabel ? null : label,
      placeholder: placeholder,
      disabled,
      value,
      inputProps: {
        ...htmlAttributes,
        style: inputStyle,
        maxLength,
      }, // set html attributes
      InputProps: InputProp,
      onFocus: onFocusHandler,
      onBlur: onBlurHandler,
      maxRows: rowsMax,
      multiline: !!rowsMax,
      error,
      helperText: error ? helperText : null,
      InputLabelProps,
    }),
    [
      type,
      placeholder,
      adornmentFrontLabel,
      label,
      disabled,
      value,
      htmlAttributes,
      inputStyle,
      maxLength,
      InputProp,
      onFocusHandler,
      onBlurHandler,
      rowsMax,
      error,
      helperText,
      InputLabelProps,
    ]
  );

  return (
    <DefaultFormControl required={required} $widthParent={sizeTextField?.width}>
      {!!placeholder || !!adornmentFrontLabel ? (
        <InputLabel htmlFor={name} shrink>
          {label}
        </InputLabel>
      ) : (
        <></>
      )}
      <DefaultTextInput
        id={name}
        style={style}
        variant="outlined"
        autoComplete="off"
        fullWidth
        {...props}
        {...styleTextProps}
        name={name}
        data-sl="mask"
        onChange={onChangeHandler}
        value={fieldValue}
      />
      {!!description ? (
        <FormHelperText sx={{ marginLeft: "2px" }}>
          {description}
        </FormHelperText>
      ) : (
        <></>
      )}
    </DefaultFormControl>
  );
};

export default TextField;
