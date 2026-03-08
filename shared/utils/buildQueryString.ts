type QueryParams = {
    [key: string]: string | number | boolean | Array<string | number | boolean> | null | undefined;
};

export const buildQueryString = (params: QueryParams) => {
    return Object.keys(params)
        .filter((key) => params[key] !== null && params[key] !== undefined && params[key] !== '')
        .flatMap((key) => {
            const value = params[key];
            if (Array.isArray(value)) {
                return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
            }

            return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
        })
        .join('&');
};

export const getQueryParams = (queryString: string): QueryParams => {
    const params: QueryParams = {};
    const searchParams = new URLSearchParams(queryString);

    searchParams.forEach((value, key) => {
        if (key in params) {
            if (Array.isArray(params[key])) {
                (params[key] as Array<string | number | boolean>).push(value);
            } else {
                params[key] = [params[key] as string, value];
            }
        } else {
            params[key] = value;
        }
    });

    return params;
};
