import { GraphQLScalarType } from "graphql";

export const GraphQlJson = new GraphQLScalarType({
  name: "Json",
  serialize: (value) => value
});