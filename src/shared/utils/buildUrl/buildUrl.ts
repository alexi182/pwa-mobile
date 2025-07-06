interface IbuildUrl {
  url: string;
  searchParams?: {
    [keys: string]: any;
  };
}

const buildUrl = (params: IbuildUrl): string => {
  const { url, searchParams } = params;
  const myURL = new URL(url);
  if (searchParams) {
    Object.keys(searchParams).forEach((key) => {
      const value = searchParams[key];
      let valueTrim;
      if (typeof value !== 'undefined') {
        if (typeof value === 'string') {
          valueTrim = value.trim();
        } else {
          valueTrim = value;
        }
        if (Array.isArray(value)) {
          if (value.length > 0) {
            value.map((item) => {
              myURL.searchParams.append(key.toString(), item.toString());
            });
          }
        } else if (value !== '' && value !== null) {
          myURL.searchParams.append(key.toString(), valueTrim.toString());
        }
      }
    });
  }
  return myURL.toString();
};

export default buildUrl;
