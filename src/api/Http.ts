const Http = {
    get: (url: string, options?: any) => {
      let querystring = "";
      const params = (options || {}).params;
  
      if (params) {
        querystring = "?" +
          Object.keys(params).map(key => term(params, key)).join("&");
      }
  
      return fetch(url + querystring, { method: "GET", ...(options || { headers: {} }) });
    },
  
    post: (url: string, data: any, options?: any) => {
      let body;
  
      if (data instanceof FormData && data.has("files")) {
        body = data;
      } else {
        options = options ? options : { headers: {} };
        options.headers["Content-Type"] = "application/json";
        body = JSON.stringify(data);
      }
  
      return fetch(url, {
        method: "POST",
        body: body,
        ...(options || { headers: {} })
      });
    },
  
    patch: (url: string, updates: any, options?: any) => {
      options = options ? options : { headers: {} };
      options.headers["Content-Type"] = "application/json";
  
      return fetch(url, {
        method: "PATCH",
        body: JSON.stringify(updates),
        ...(options || { headers: {} })
      });
    },
  
    delete: (url: string, options?: any) => {
      return fetch(url, { method: "DELETE", ...(options || {}) });
    }
  };
  
  function term(params:any, key:any) {
    if (params[key].constructor === Array) {
      return params[key].map((v:any) => `${key}=${v}`).join("&");
    }
    return `${key}=${params[key]}`;
  }
  
  export default Http;