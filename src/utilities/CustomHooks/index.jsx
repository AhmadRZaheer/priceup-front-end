import { Location } from "./location"
import { MirrorsHardware } from "./mirrorsHardware"
import { ShowersHardware } from "./showersHardware"

export const CustomHooks = () => {
    return (<>
        <Location />
        <MirrorsHardware />
        <ShowersHardware />
    </>);
}