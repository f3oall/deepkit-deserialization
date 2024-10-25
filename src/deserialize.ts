import { deserialize as deepkitDeserialize, ReceiveType } from "@deepkit/type";

export function deserialize<T>(json: string, type?: ReceiveType<T>) {
	const data = JSON.parse(json);

	return deepkitDeserialize<T>(
		data,
		{ loosely: false },
		undefined,
		undefined,
		type,
	);
}
