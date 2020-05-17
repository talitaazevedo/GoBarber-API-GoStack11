interface ITemplateVariables {
  // Hack para receber um objeto contendo qualquer informação com typescript
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
