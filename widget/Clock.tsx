import GLib from "gi://GLib?version=2.0";
import { Variable } from "../../../../../usr/share/astal/gjs";


export default function Clock({ format = "%H:%M - %A %e." }) {
    const time = Variable<string>("").poll(10000, () =>
        GLib.DateTime.new_now_local().format(format)!)

    return <label
        className="Time"
        onDestroy={() => time.drop()}
        label={time()}
    />
}