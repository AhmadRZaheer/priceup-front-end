import { Location } from "./location"
import { MirrorsHardware } from "./mirrorsHardware"
import { ShowersHardware } from "./showersHardware"
import { Notifications } from "./notifications"

export const CustomHooks = () => {
    return (<>
        <Location />
        <MirrorsHardware />
        <ShowersHardware />
        <Notifications />
    </>);
}