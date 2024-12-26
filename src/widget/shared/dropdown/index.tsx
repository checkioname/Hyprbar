import { App, Astal, Gdk, Gtk } from 'astal/gtk3';
import { Revealer } from 'astal/gtk3/widget';

interface SimpleDropdownProps {
    name: string;
    child: JSX.Element;
    transition?: number;
    visible?: boolean;
    label?: string;
    onClose?: () => void;
}

export default ({
    name,
    child,
    transition = Gtk.RevealerTransitionType.SLIDE_DOWN, // Tipo de transição padrão
    visible = false,
    label,
    onClose,
}: SimpleDropdownProps): JSX.Element => {
    return (
        <window
            name={name}
            className={`${name}-dropdown-menu`}
            visible={visible}
            application={App}
            layer={Astal.Layer.TOP}
            onKeyPressEvent={(_, event) => {
                const key = event.get_keyval()[1];
                if (key === Gdk.KEY_Escape && onClose) {
                    onClose();
                }
            }}
        >
            <eventbox
                className="dropdown-background"
                onButtonPressEvent={() => {
                    if (onClose) onClose();
                }}
            >
                <box className="dropdown-container" vertical>
                    <revealer
                        revealChild={visible}
                        transitionType={transition}
                        setup={(self: Revealer) => {
                            App.connect('window-toggled', (app) => {
                                const targetWindow = app.get_window(name);
                                const isVisible = targetWindow?.get_visible() || false;
                                self.set_reveal_child(isVisible);
                            });
                        }}
                    >
                        <box className="dropdown-content" canFocus>
                            {child}
                        </box>
                    </revealer>
                </box>
            </eventbox>
        </window>
    );
};