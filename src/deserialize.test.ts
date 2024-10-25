import { expect, it } from "bun:test";
import { deserialize } from "./deserialize";
import { deserialize as deepkitDeserialize } from "@deepkit/type";

enum ExampleEnum {
	A = "A",
	B = "B",
}

interface ExampleData {
	id: string;
	age: number;
	date?: Date;
	enum?: ExampleEnum;
}

// just to make sure the wrapper works
it("should work with wrapper", () => {
	const json = `{"id": "1", "age": 10, "enum": "a", "date": "2021-01-01T00:00:00.000Z"}`;
	const data = deserialize<ExampleData>(json);
	expect(data.id).toBe("1");
	expect(data.age).toBe(10);
	expect(data.enum).toBe(ExampleEnum.A);
	expect(data.date).toEqual(new Date("2021-01-01T00:00:00.000Z"));
});

// this one should throw but it doesn't
it("should throw when properties missing (with wrapper)", () => {
	const json = `{"id": "1"}`;
	expect(() => deserialize<ExampleData>(json)).toThrow();
});

// this one isn't throwing either
// //however, if we don't use the wrapper, it throws as expected
it("should throw when properties missing", () => {
	const json = `{"enum": "A"}`;
	const data: unknown = JSON.parse(json);
	expect(() => {
		deepkitDeserialize<ExampleData>(data, { loosely: false });
	}).toThrow();
});

// this one isn't throwing either
// //however, if we don't use the wrapper, it throws as expected
it("should throw when number is string when 'loosely' is false", () => {
	const json = `{"enum": "A", "id": "1", "age": "23"}`;
	const data: unknown = JSON.parse(json);
	expect(() => {
		deepkitDeserialize<ExampleData>(data, { loosely: false });
	}).toThrow();
});

// also, this one throws as expected, so it might have something to do with property optionality guards?
it("should throw with wrong enum", () => {
	const json = `{"id": "1", "age": 10, "enum": "C"}`;
	expect(() => deserialize<ExampleData>(json)).toThrow();
});
