export type Error = {
    message:
        | string
        | {
              ru: string;
              he: string;
          };
    errors: any[];
    statusCode: number;
};
