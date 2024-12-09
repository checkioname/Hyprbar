import { Variable } from "astal";
import Network from "gi://AstalNetwork";
import { bind } from "astal";

export default function Wifi() {
    // Variável para armazenar as redes Wi-Fi
    const networks = Variable<string[]>([]);

    // Função para obter as redes Wi-Fi disponíveis
    // const scanNetworks = async () => {
    //     const wifi = new Network.Wifi();
    //     await wifi.scan();
    //     const availableNetworks = wifi.get_access_points();
    //     networks.set(availableNetworks.map(network => network.ssid)); // Salva os SSIDs
    // };

    // // Ações ao passar o mouse sobre o ícone
    // const handleMouseOver = () => {
    //     scanNetworks();
    // };

    // // Chama o scan a cada 5 segundos (opcional)
    // setInterval(scanNetworks, 5000);

    const { wifi } = Network.get_default();

    return (
        <box>
            <icon
                tooltipText={bind(wifi, "ssid").as(String)}
                className="Wifi"
                icon={bind(wifi, "iconName")}
            />
            <label 
                label={bind(wifi, "bandwidth").as(p => ` ${Math.floor(Number(p))} %`)} 
            />
        </box>
    );
}
