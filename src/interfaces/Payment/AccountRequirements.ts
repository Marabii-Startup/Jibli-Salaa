// Represents an allowed value in a select, radio, or similar field
export interface ValuesAllowed {
  key: string;
  name: string;
}

// Represents a group of related field properties
export interface Group {
  key: string;
  name: string;
  type: "text" | "select" | "radio" | "date"; // You can extend this if there are more types
  refreshRequirementsOnChange: boolean;
  required: boolean;
  displayFormat: string | null;
  example: string;
  minLength: number | null;
  maxLength: number | null;
  validationRegexp: string | null;
  validationAsync: string | null;
  valuesAllowed: ValuesAllowed[] | null;
}

// Represents a field, which can contain multiple groups
export interface Field {
  name: string;
  group: Group[];
}

// Represents the main account requirement object
export interface AccountRequirement {
  type: string;
  title: string;
  usageInfo: string | null;
  fields: Field[];
}

// The overall response is an array of AccountRequirement objects
export type AccountRequirementsResponse = AccountRequirement[];
