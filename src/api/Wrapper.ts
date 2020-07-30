import Client from "./Client";

const actions = (resource?: string) => {
  return {
    all: function(params:any) {
      return params ? Client.all(resource, params) : Client.all(resource, {});
    },

    find: function(id:number) {
      return Client.find(resource, id);
    },

    create: function(data:any) {
      return Client.create(resource, data);
    },

    update: function(id:number, updates:any) {
      return Client.update(resource, id, updates);
    },

    destroy: function(id:number) {
      return Client.destroy(resource, id);
    },
  };
};

const underscore = (str:any) =>
  str.replace(/([A-Z]+)/g, (x:any) => "_" + x.toLowerCase());

export default new Proxy({}, {
  get: function(_, prop) {
    if (prop !== "request") {
      const resource = prop;
      return actions(underscore(resource));
    }
  }
});