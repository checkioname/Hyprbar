import { App, Astal, Gtk } from "astal/gtk3";
import { Variable } from "astal";

// Obter os workspaces ativos
const currentWorkspace = Variable("").poll(100, () => {
    return Astal.Workspaces.get_current_workspace().index.toString();
});

const workspaces = Variable([]).poll(100, () => {
    return Astal.Workspaces.get_workspaces().map((workspace, index) => ({
        index,
        name: `Workspace ${index + 1}`,
        active: index === Astal.Workspaces.get_current_workspace().index,
    }));
});

export default function Workspaces() {
    return (
        <box className="workspaces" orientation={Gtk.Orientation.HORIZONTAL} spacing={10}>
            {workspaces().map(({ index, name, active }) => (
                <button
                    key={index}
                    onClick={() => Astal.Workspaces.switch_to_workspace(index)}
                    className={active ? "active" : ""}>
                    <label label={name} />
                </button>
            ))}
        </box>
    );
}
