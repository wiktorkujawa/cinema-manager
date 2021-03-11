import {
  Box,
  ButtonGroup,
  FormControl,
  // FormErrorMessage,
  // FormLabel,
  // Input,
  // Textarea
  Radio,
} from "@chakra-ui/react";
import { Formik } from "formik";
import {
  CheckboxContainer,
  CheckboxControl,
  CheckboxSingleControl,
  InputControl,
  NumberInputControl,
  // PercentComplete,
  RadioGroupControl,
  ResetButton,
  SelectControl,
  SliderControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from "formik-chakra-ui";
import * as React from "react";
import * as Yup from "yup";

import styles from "../assets/styles.module.scss";

type Types =
  | "text"
  | "textarea"
  | "checkbox"
  | "number"
  | "password"
  | "date"
  | "radio"
  | "select"
  | "range"
  | "switch"
  | "date"
  | "datetime";


interface Props {
  key: string;
  type: Types;
  defaultValue?: any;
  required?: boolean;
  templateOptions?: {
    options?: any[];
    label?: string;
    placeholder?: string;
    required?: boolean;
  };
  validators?: {
    min?: number;
    max?: number;
    equals?: [any];
  };
}

const ChakraForm = (props: { fields: Props[], onSubmit: any, errors: any }) => {
  const { fields, onSubmit, errors } = props;


  let initialValues: any = fields.reduce(
    (obj, item) => Object.assign(obj, 
      
      item.type==='date'? { [item.key]: item.defaultValue || new Date().toISOString().slice(0, 10) }:
      item.type==='datetime' ? { [item.key]: item.defaultValue || new Date().toISOString().slice(0, 16) } :
      { [item.key]: item.defaultValue || "" }
      ),{}
  );

  let validationSchema = fields.reduce((obj: any, item) => {
    if (item.required) {
      if (
        item.type === "text" ||
        item.type === "textarea" ||
        item.type === "password" ||
        item.type === "select" ||
        item.type === "radio" ||
        item.type === "date" ||
        item.type === "datetime"
      ) {
        if (item.validators?.min && item.validators?.max) {
          return Object.assign(obj, {
            [item.key]: Yup.string()
              .required()
              .min(item.validators?.min)
              .max(item.validators?.max),
          });
        }
        if (item.validators?.min) {
          return Object.assign(obj, {
            [item.key]: Yup.string().required().min(item.validators?.min),
          });
        }
        if (item.validators?.max) {
          return Object.assign(obj, {
            [item.key]: Yup.string().required().max(item.validators?.max),
          });
        } else
          return Object.assign(obj, { [item.key]: Yup.string().required() });
      }
      if (item.type === "number" || item.type === "range") {
        if (item.validators?.min && item.validators?.max) {
          return Object.assign(obj, {
            [item.key]: Yup.number()
              .required()
              .min(item.validators?.min)
              .max(item.validators?.max),
          });
        }
        if (item.validators?.min) {
          return Object.assign(obj, {
            [item.key]: Yup.number().required().min(item.validators?.min),
          });
        }
        if (item.validators?.max) {
          return Object.assign(obj, {
            [item.key]: Yup.number().required().max(item.validators?.max),
          });
        } else
          return Object.assign(obj, { [item.key]: Yup.number().required() });
      }

      if (item.type === "checkbox" || item.type === "switch") {
        if (item.templateOptions?.options) {
          return Object.assign(obj, { [item.key]: Yup.array() });
        }
        return Object.assign(obj, { [item.key]: Yup.boolean().required() });
      }
    }
  }, {});

  validationSchema = Yup.object(validationSchema);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values }) => (
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >
          {fields.map((item) => {
            if (item.type === "text") {
              return (
                <InputControl
                  key={item.key}
                  name={item.key}
                  label={item.templateOptions?.label}
                  placeholder={item.templateOptions?.placeholder}
                />
              );
            }
            if (item.type === "range") {
              return (
                <div key={item.key} style={{ display: "flex" }}>
                  <SliderControl
                    label={item.templateOptions?.label}
                    name={item.key}
                    sliderProps={{
                      max: item.validators?.max,
                      min: item.validators?.min,
                    }}
                  />
                  <div> {values[item.key]} </div>
                </div>
              );
            }
            if (item.type === "password") {
              return (
                <InputControl
                  className={styles.password}
                  key={item.key}
                  name={item.key}
                  label={item.templateOptions?.label}
                  placeholder={item.templateOptions?.placeholder}
                />
              );
            }
            if (item.type === "textarea") {
              return (
                <TextareaControl
                  key={item.key}
                  name={item.key}
                  label={item.templateOptions?.label}
                />
              );
            }
            if (item.type === "number") {
              return (
                <NumberInputControl
                  key={item.key}
                  name={item.key}
                  label={item.templateOptions?.label}
                />
              );
            }
            if (item.type === "radio") {
              return (
                <RadioGroupControl
                  key={item.key}
                  name={item.key}
                  label={item.templateOptions?.label}
                >
                  {item.templateOptions?.options?.map((option) => {
                    return (
                      <Radio id={option} key={option} value={option}>
                        {option}
                      </Radio>
                    );
                  })}
                </RadioGroupControl>
              );
            }
            if (item.type === "date") {
              return (
                <FormControl key={item.key}>
                  <div>
                    <div>
                      <label htmlFor={item.key}>
                        {item.templateOptions?.label}:{" "}
                      </label>
                    </div>
                    <div>
                      <input
                        className="mt-2 btn btn-outline-dark"
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        id={item.key}
                        type="date"
                        onChange={(event) => {
                          return (values[item.key] = event.target.value);
                        }}
                      />
                    </div>
                  </div>
                </FormControl>
              );
            }
            if (item.type === "datetime") {
              return (
                <FormControl key={item.key}>
                  <div>
                    <div>
                      <label htmlFor={item.key}>
                        {item.templateOptions?.label}:{" "}
                      </label>
                    </div>
                    <div>
                      <input
                        className="mt-2 btn btn-outline-dark"
                        defaultValue={new Date().toISOString().slice(0, 16)}
                        id={item.key}
                        type="datetime-local"
                        onChange={(event) => {
                          return (values[item.key] = event.target.value);
                        }}
                      />
                    </div>
                  </div>
                </FormControl>
              );
            }
            if (item.type === "select") {
              return (
                <SelectControl
                  key={item.key}
                  name={item.key}
                  selectProps={{
                    placeholder: item.templateOptions?.placeholder,
                  }}
                >
                  {item.templateOptions?.options?.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </SelectControl>
              );
            }
            if (item.type === "switch") {
              return (
                <SwitchControl
                  key={item.key}
                  name={item.key}
                  label={item.templateOptions?.label}
                />
              );
            }
            if (item.type === "checkbox") {
              if (item.templateOptions?.options) {
                return (
                  <CheckboxContainer
                    key={item.key}
                    name={item.key}
                    label={item.templateOptions?.label}
                  >
                    {item.templateOptions?.options?.map((option) => {
                      return (
                        <CheckboxControl
                          key={option}
                          name={item.key}
                          value={option}
                        >
                          {option}
                        </CheckboxControl>
                      );
                    })}
                  </CheckboxContainer>
                );
              }
              return (
                <CheckboxSingleControl key={item.key} name={item.key}>
                  {item.templateOptions?.label}
                </CheckboxSingleControl>
              );
            }
          })}

          <ButtonGroup>
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>

          <Box className="text-center" >
            {errors}
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default ChakraForm;
