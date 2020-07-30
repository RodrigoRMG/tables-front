import Http from "./Http";
const Client = {
  all: async (resource:any, params:any) => {
    const path = `/${resource}`;
    const opts = options();
    if (params) { opts.params = params; }

    const response = await Http.get(apiURL(path), opts);

    return whenOk(response, (response:any) => response.json());
  },

  find: async (resource:any, id:number) => {
    const path = `/${resource}/${id}`;
    const response = await Http.get(apiURL(path), options());
    return whenOk(response, (response:any) => response.json());
  },

  create: async (resource:any, data:any) => {
    const path = `/${resource}`;
    const response = await Http.post(apiURL(path), data, options());

    return whenOk(response, (response:any) => response.json());
  },

  update: async (resource:any, id:number, updates:any) => {
    const path = `/${resource}/${id}`;
    const response = await Http.patch(apiURL(path), updates, options());

    return whenOk(response, (response:any) => response.json());
  },

  destroy: async (resource:any, id:number) => {
    const path = `/${resource}/${id}`;
    const response = await Http.delete(apiURL(path), options());

    return whenOk(response, () => null);
  },
  request: async (path: string, data?: any) => {
    const response = await Http.post(apiURL(path), data || {}, options());

    return whenOk(response, (response:any) => response);
  }
};

const options = (): { headers: any, params?: any, } => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      "Authorization": `${token}`,
      "Accept": "application/json"
    }
  };
};

async function whenOk(response:any, handle:any) {
  if (response.status >= 200 && response.status < 300) {
    return handle(response);
  } else {
    const error = new Error() as any;

    try {
      error.message = response.message;
      error.response = await response.json();
    } catch(_) {}
    error.message = error.message || response.statusText;
    const handledError = Promise.reject(error);
    return handledError;
  }
}

const apiURL = (path:string) => '/api' + path;

export { Client, apiURL };
export default Client;
