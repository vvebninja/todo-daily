import createFetchClient from "openapi-fetch"; //fetch wrapper
import createClient from "openapi-react-query"; //react query wrapper
import { CONFIG } from "../model/config";
import type { ApiPaths } from "./schema";

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);
