import { GLib } from "astal";

var Run = (programs: string[]) => {
    return GLib.spawn_async(
        null, // Não há diretório de trabalho específico
        programs, // Comando a ser executado
        null, // Variáveis de ambiente
        GLib.SpawnFlags.SEARCH_PATH, // Procurar no PATH do sistema
        null // Função de callback
    );
};


export default (): JSX.Element => {
    return (
        
            <button className="Spotify"
                onClick={() => Run(["spotify"])}
                tooltipText="Abrir Configuração de Áudio">
                <label label="󰓇" />
            </button>
    );
};