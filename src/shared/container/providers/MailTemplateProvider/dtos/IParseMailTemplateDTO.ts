interface ITemplateVariables {
  // Hack para receber um objeto contendo qualquer informação com typescript
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
