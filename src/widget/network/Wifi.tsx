import { Variable } from "astal";
import Network from "gi://AstalNetwork";
import { bind } from "astal";

export default function Wifi() {
    // Variável para armazenar as redes Wi-Fi
    const networks = Variable<string[]>([]);

    const { wifi } = Network.get_default();

    return (
        <box className="Wifi">
            <icon
                tooltipText={bind(wifi, "ssid").as(String)}
                className="Wifi-icon"
                icon={bind(wifi, "iconName")}
            />
            <label 
                label={bind(wifi, "bandwidth").as(p => ` ${Math.floor(Number(p))} %`)} 
            />
        </box>
    );



    //(
    //    <DropdownMenu
    //        name={'networkmenu'}
    //    >
    //        <box className={'menu-items network'}>
    //            <box className={'menu-items-container network'} vertical hexpand>
    //                {bind(wifi, 'ssid').as((wifi) => {
    //                    return <Wifi />;
    //                })}
    //            </box>
    //        </box>
    //    </DropdownMenu>
    //);
}
