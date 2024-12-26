import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import GLib from "gi://GLib";
import { Variable } from "astal"
import Workspaces from "./Workspaces"
import BatteryPercentage from "./battery/Battery"
import Clock from "./clock/Clock"
import Wifi from "./network/Wifi"
import Systray from "./Systray"
import Volume from "./Audio/Volume";
import { BluetoothHeader } from "./bluetooth/header";
import Bluetooth from "./bluetooth";
import Spotify from "./spotify";

const time = Variable("").poll(1000, "date")


var Run = (programs: string[]) => {
    return GLib.spawn_async(
        null, // Não há diretório de trabalho específico
        programs, // Comando a ser executado
        null, // Variáveis de ambiente
        GLib.SpawnFlags.SEARCH_PATH, // Procurar no PATH do sistema
        null // Função de callback
    );
};


export default function Bar(gdkmonitor: Gdk.Monitor) {
    return <window
            className="Bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={
                Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.LEFT |
                Astal.WindowAnchor.RIGHT
            }
            application={App}>
            <centerbox>
                {/* Seção à esquerda */}
                <box>
                    <button
                        halign={Gtk.Align.START}
                        onClicked="echo 'Menu clicked!'"
                        className="ArchLogo">  
                        <label label="󰣇" />
                    </button>

                    <button
                        halign={Gtk.Align.START}
                        onClick={() => Run(["kitty"])}
                        tooltipText="Abrir Terminal"
                        className="Terminal">
                        <label label="" /> {/* FontAwesome ou outro ícone */}
                    </button>

                    <Spotify/>
                    
                    <BluetoothHeader/>

                </box>

                {/* Seção central */}
                <box halign={Gtk.Align.CENTER}>
                    <Workspaces />
                </box>

                {/* Seção à direita */}
                <box halign={Gtk.Align.END} spacing={10}>
                    {/* Botão de Terminal */}


                    {/* Relógio */}
                    {/* <box halign={Gtk.Align.CENTER}> */}
                        <Clock />
                    {/* </box> */}

                    <Wifi/>

                    <BatteryPercentage/>

                    {/* Ícone de Volume */}
                    <box className="Volume">
                        <button
                            onClick={() => Run(["pavucontrol"])}
                            tooltipText="Abrir Configuração de Áudio">
                            <label label="󰕾" />
                        </button>
                    </box>
                    {/*<Volume/> */}

                    <Bluetooth/>

                    {/* <Systray/> */}
                </box>
            </centerbox>
        </window>
}
