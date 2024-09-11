import { jsonHandler } from "@/utils/jsonHandler";

describe("Parse json", () => {
  it("should return an object when an object string is assigned", () => {
    expect(jsonHandler('{"object":"abs"}')).toEqual({ object: "abs" });
  });

  it("should return an array when an array string is assigned", () => {
    expect(jsonHandler('["a"]')).toEqual(["a"]);
    expect(jsonHandler('[{"a":"b"},{"c":"d"}]')).toEqual([
      { a: "b" },
      { c: "d" },
    ]);
  });

  it("should return a empty object when an error occurs", () => {
    expect(jsonHandler("str")).toEqual({});
    expect(jsonHandler('{{"a":"b"},{"bb":c;}}')).toEqual({});
  });
});
