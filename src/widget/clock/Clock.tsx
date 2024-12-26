import { Gtk } from "astal/gtk3"
import GLib from "gi://GLib?version=2.0";
import { Variable } from "../../../../../../../usr/share/astal/gjs";


export default function Clock({ format = "%H:%M - %A %e." }) {
    const time = Variable<string>("").poll(10000, () =>
        GLib.DateTime.new_now_local().format(format)!)

    return  <box className="Time" onDestroy={() => time.drop()} halign={Gtk.Align.CENTER}>
                {time()}
            </box>
}
