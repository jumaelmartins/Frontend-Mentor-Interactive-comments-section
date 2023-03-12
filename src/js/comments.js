const url = "../src/data.json";

export const getData = async () => {
  try {
    const data = fetch(url);
    if ((await data).status === 200) {
      const results = (await data).json();
      return results;
    }
  } catch (e) {
    console.error(e);
  }
};


