export class StrictMap<TData> {
    private map = new Map<string, TData>();

    public get = (key: string): TData => {
        if (!this.map.has(key)) {
            throw new Error(`Cannot get data with key "${key}" from StrictMap.`);
        }

        return this.map.get(key)!;
    };

    public set = (key: string, value: TData) => {
        this.map.set(key, value);
    };

    public has = (key: string): boolean => {
        return this.map.has(key);
    };
}
