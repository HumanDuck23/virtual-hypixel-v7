import { ModuleManifestInterface } from "./ModuleManifestInterface"
import { ModuleConfigInterface } from "./ModuleConfigInterface"

export interface ModuleInterface {
    manifest: ModuleManifestInterface,
    config: ModuleConfigInterface
    instance: any
}