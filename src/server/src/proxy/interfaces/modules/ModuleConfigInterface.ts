export interface ModuleConfigInterface {
    [key: string]: {
        type: "text" | "number" | "multi",
        label: string,
        options?: string[]
    }
}