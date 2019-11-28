import { ApolloServer } from "apollo-server-micro";
import { createContext } from "./src/context";
import { schema } from "./src/schema";

const apolloServer = new ApolloServer({
  schema,
  context: createContext
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
