export const fetchFacade = (url: string, options: any = { headers: {} }) => {
  const { headers, ...restOptions } = options;

  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: "include",
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    })
      .then((resp) => resp.json())
      .then(resolve)
      .catch(() => reject(new Error("Something went wrong :(")));
  });
};
