export class ValueStore<TData> extends Map<string, TData> {
    public get = (key: string): TData => {
        if (!this.has(key)) {
            throw new Error(`Cannot get data with key "${key}" from StrictMap.`);
        }

        return super.get(key)!;
    };
}
