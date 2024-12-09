import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import GLib from "gi://GLib";
import { Variable } from "astal"
import Workspaces from "./Workspaces"
import BatteryPercentage from "./Battery"
import Clock from "./Clock"
import Wifi from "./Wifi"
import Systray from "./Systray"

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
                </box>

                {/* Seção central */}
                <box halign={Gtk.Align.CENTER}>
                    <Workspaces />
                </box>

                {/* Seção à direita */}
                <box halign={Gtk.Align.END} spacing={10}>
                    {/* Botão de Terminal */}
                    <button
                        onClick={() => Run(["kitty"])}
                        tooltipText="Abrir Terminal"
                        className="Terminal">
                        <label label="" /> {/* FontAwesome ou outro ícone */}
                    </button>


                    {/* Relógio */}
                    <button halign={Gtk.Align.CENTER}>
                        <Clock/>
                    </button>

                    <Wifi/>

                    <BatteryPercentage/>

                    {/* Ícone de Volume */}
                    <button
                        onClick={() => Run(["pavucontrol"])}
                        tooltipText="Abrir Configuração de Áudio">
                        <label label="🔊" />
                    </button>

                    <Systray/>
                </box>
            </centerbox>
        </window>
}