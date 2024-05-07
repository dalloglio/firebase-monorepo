export const MockRepository = jest.fn().mockImplementation(() => ({
  save: jest.fn(),
  exists: jest.fn(),
  setIncrementId: jest.fn(),
}));

export const MockUseCase = jest.fn().mockImplementation(() => ({
  execute: jest.fn(),
}));

export const MockRequest = jest.fn().mockImplementation(() => ({
  body: {
    name: "name",
  },
}));

export const MockResponse = jest.fn().mockImplementation(() => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
}));

export const MockFirestore = jest.fn(() => ({
  collection: jest.fn().mockReturnValue({
    doc: jest.fn().mockReturnValue({
      set: jest.fn(),
      get: jest.fn().mockReturnValue({
        exists: true,
      }),
      update: jest.fn(),
    }),
  }),
}));
