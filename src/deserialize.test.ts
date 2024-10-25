import { expect, it } from "bun:test";
import { deserialize } from "./deserialize";
import { deserialize as deepkitDeserialize } from "@deepkit/type";

interface ExampleData {
	id: string;
	age: number;
}

// just to make sure the wrapper works
it("should work with wrapper", () => {
	const json = `{"id": "1", "age": 10, "date": "2021-01-01T00:00:00.000Z"}`;
	const data = deserialize<ExampleData>(json);
	expect(data.id).toBe("1");
	expect(data.age).toBe(10);
});

// this one should throw but it doesn't
it("should throw with wrapper", () => {
	const json = `{"id": "1"}`;
	expect(() => deserialize<ExampleData>(json)).toThrow();
});

// however, if we don't use the wrapper, it throws as expected
it("should throw", () => {
	const json = `{"id": "1"}`;
	expect(() => deepkitDeserialize<ExampleData>(json)).toThrow();
});
