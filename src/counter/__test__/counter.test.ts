import { Counter } from "../counter";

describe("Check Counter Functions", () => {
  it("should return expected response", () => {
    const result = Counter({
      count: 20,
    });
    expect(result).toBe(20);
  });
});
