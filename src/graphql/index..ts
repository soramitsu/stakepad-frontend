import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export class GraphWrapper {
  getQuery(
    name: string,
    scheme: string,
    variableFunction: (arg0: any) => any,
    options: Record<string, any>,
  ) {
    return useQuery(
      gql`
        query ${name} {
          ${scheme}
        }
      `,
      variableFunction,
      options,
    );
  }

  getMutation(
    name: string,
    variableTypes: string,
    variableList: string,
    scheme: string,
    options: Record<string, any>,
  ) {
    return useMutation(
      gql`
        mutation ${name} (${variableTypes}) {
          ${name} (${variableList}) {
            ${scheme}
          }
        }
      `,
      options,
    );
  }
}
