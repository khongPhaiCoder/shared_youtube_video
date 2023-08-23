import '@testing-library/jest-dom';

const globalAny: any = global;

const mockImport = (importName: string) => {
  return Promise.resolve({});
};

globalAny.System = {
  import: jest.fn(mockImport),
};
