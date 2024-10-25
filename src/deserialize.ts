import { deserialize as deepkitDeserialize, type ReceiveType } from "@deepkit/type";

export function deserialize<T>(json: string, type?: ReceiveType<T>) {
    const data = JSON.parse(json);

    return deepkitDeserialize<T>(data, undefined, undefined, undefined, type)
}