import { useMutation, useQuery, useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, watch } from "vue";

// Wrapper for three of the main ways of communicating with the GraphQL node
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

  getSubscription(name: string, scheme: string) {
    const messages = ref([] as any)

    const { result } = useSubscription(
      gql`
        subscription ${name} {
          ${scheme}
        }
      `
    )

    watch(
      result,
      (data: any) => {
        messages.value.push(data)
      }
    )

    return {
      messages
    }
  }
}
