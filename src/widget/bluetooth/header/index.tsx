import { Gtk } from 'astal/gtk3';
// import { Controls } from './Controls';

export const BluetoothHeader = (): JSX.Element => {
    const MenuLabel = (): JSX.Element => {
        return <label className="bluetooth-menu-label Icons" valign={Gtk.Align.CENTER} halign={Gtk.Align.START} label="" />;
    };

    return (
        <button className="menu-label-container Icons" 
            // halign={Gtk.Align.FILL} 
            // valign={Gtk.Align.START}
            >
            <MenuLabel />
            {/* <Controls /> */}
        </button>
    );
};
